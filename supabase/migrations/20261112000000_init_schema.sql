-- Migração Inicial: Esquema de Dados e Segurança da Barbearia Luz
-- Data: 2026-11-12

-- 1. Habilitar Extensões Essenciais
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- 2. Tipos Customizados (ENUMs)
CREATE TYPE user_role AS ENUM ('admin', 'barber');
CREATE TYPE appointment_status AS ENUM ('confirmed', 'completed', 'canceled', 'no_show');

-- 3. Tabelas Principais

-- Tabela de Perfis de Usuário (Barbeiros e Administradores)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'barber',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de Catálogo de Serviços
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    category TEXT NOT NULL DEFAULT 'Geral',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de Clientes
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de Horários de Expediente dos Barbeiros (0 = Domingo, 6 = Sábado)
CREATE TABLE barber_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barber_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT check_schedule_times CHECK (start_time < end_time)
);

-- Tabela de Intervalos Bloqueados (Folgas, Almoço, Imprevistos)
CREATE TABLE blocked_times (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barber_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT check_blocked_times CHECK (start_at < end_at)
);

-- Tabela de Agendamentos
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barber_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'confirmed',
    total_price_cents INTEGER NOT NULL DEFAULT 0 CHECK (total_price_cents >= 0),
    payment_method TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT check_appointment_dates CHECK (start_at < end_at),
    -- CONSTRAINT CRÍTICA: Prevenção rigorosa de sobreposição temporal (Anti-Double Booking)
    CONSTRAINT no_overlapping_appointments EXCLUDE USING gist (
        barber_id WITH =,
        tstzrange(start_at, end_at) WITH &&
    ) WHERE (status IN ('confirmed'))
);

-- Tabela Relacional de Serviços do Agendamento (permite múltiplos serviços por sessão)
CREATE TABLE appointment_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (appointment_id, service_id)
);

-- 4. Gatilhos de Atualização Automática de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON clients
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Funções Auxiliares de Segurança e RLS
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    );
$$;

-- 6. Habilitação de Row Level Security (RLS) em Todas as Tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE barber_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_services ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de Segurança (RLS Policies)

-- PROFILES
-- Leitura pública para barbeiros ativos; leitura completa para administradores ou próprio usuário
CREATE POLICY "Public profiles read policy"
ON profiles FOR SELECT
USING (
    (role = 'barber' AND is_active = true) OR
    (id = auth.uid()) OR
    is_admin()
);

-- Modificação por admin ou pelo próprio usuário
CREATE POLICY "Profiles update policy"
ON profiles FOR UPDATE
USING (id = auth.uid() OR is_admin())
WITH CHECK (id = auth.uid() OR is_admin());

CREATE POLICY "Profiles insert policy"
ON profiles FOR INSERT
WITH CHECK (id = auth.uid() OR is_admin());

-- SERVICES
-- Leitura pública de serviços ativos; leitura total para admin
CREATE POLICY "Services public read policy"
ON services FOR SELECT
USING (is_active = true OR is_admin());

-- Modificação, inserção e deleção exclusiva de admins
CREATE POLICY "Services admin insert policy"
ON services FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Services admin update policy"
ON services FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Services admin delete policy"
ON services FOR DELETE
USING (is_admin());

-- BARBER SCHEDULES
-- Leitura pública dos horários de barbeiros ativos
CREATE POLICY "Barber schedules read policy"
ON barber_schedules FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = barber_schedules.barber_id
          AND profiles.is_active = true
    ) OR is_admin()
);

-- Inserção e atualização pelo próprio barbeiro ou admin
CREATE POLICY "Barber schedules write policy"
ON barber_schedules FOR ALL
USING (barber_id = auth.uid() OR is_admin())
WITH CHECK (barber_id = auth.uid() OR is_admin());

-- BLOCKED TIMES
-- Leitura e edição pelo próprio barbeiro ou admin
CREATE POLICY "Blocked times management policy"
ON blocked_times FOR ALL
USING (barber_id = auth.uid() OR is_admin())
WITH CHECK (barber_id = auth.uid() OR is_admin());

-- CLIENTS
-- Barbeiros e admins têm acesso aos registros de clientes
CREATE POLICY "Clients access policy"
ON clients FOR ALL
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- APPOINTMENTS
-- Barbeiros visualizam e gerenciam apenas seus próprios agendamentos; admins gerenciam tudo
-- Clientes anônimos NÃO possuem leitura direta nesta tabela por privacidade
CREATE POLICY "Appointments select policy"
ON appointments FOR SELECT
TO authenticated
USING (barber_id = auth.uid() OR is_admin());

CREATE POLICY "Appointments insert policy"
ON appointments FOR INSERT
TO authenticated
WITH CHECK (barber_id = auth.uid() OR is_admin());

CREATE POLICY "Appointments update policy"
ON appointments FOR UPDATE
TO authenticated
USING (barber_id = auth.uid() OR is_admin())
WITH CHECK (barber_id = auth.uid() OR is_admin());

CREATE POLICY "Appointments delete policy"
ON appointments FOR DELETE
TO authenticated
USING (is_admin());

-- APPOINTMENT SERVICES
-- Acesso condicionado à visualização do respectivo agendamento
CREATE POLICY "Appointment services access policy"
ON appointment_services FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM appointments
        WHERE appointments.id = appointment_services.appointment_id
          AND (appointments.barber_id = auth.uid() OR is_admin())
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM appointments
        WHERE appointments.id = appointment_services.appointment_id
          AND (appointments.barber_id = auth.uid() OR is_admin())
    )
);

-- 8. Função RPC Pública de Consulta de Disponibilidade (Anti-Vazamento de Dados)
-- Retorna exclusivamente os timestamps disponíveis para um barbeiro em uma determinada data e duração de serviço.
CREATE OR REPLACE FUNCTION get_available_slots(
    p_barber_id UUID,
    p_date DATE,
    p_duration_minutes INTEGER
)
RETURNS TABLE (
    slot_time TIMESTAMPTZ
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_day_of_week SMALLINT;
    v_schedule RECORD;
    v_slot_start TIMESTAMPTZ;
    v_slot_end TIMESTAMPTZ;
    v_step_interval INTERVAL := '30 minutes'::INTERVAL;
    v_service_duration INTERVAL;
    v_tz TEXT := 'America/Sao_Paulo';
BEGIN
    -- Validar duração mínima de serviço
    IF p_duration_minutes IS NULL OR p_duration_minutes <= 0 THEN
        p_duration_minutes := 30;
    END IF;

    v_service_duration := (p_duration_minutes || ' minutes')::INTERVAL;
    -- Extrair o dia da semana da data solicitada (0 = Domingo, 6 = Sábado)
    v_day_of_week := EXTRACT(DOW FROM p_date)::SMALLINT;

    -- Iterar sobre os horários de expediente do barbeiro naquele dia da semana
    FOR v_schedule IN
        SELECT start_time, end_time
        FROM barber_schedules
        WHERE barber_id = p_barber_id
          AND day_of_week = v_day_of_week
          AND is_active = true
        ORDER BY start_time ASC
    LOOP
        -- Inicializar o primeiro slot do expediente no timezone da barbearia
        v_slot_start := (p_date + v_schedule.start_time) AT TIME ZONE v_tz;

        -- Gerar slots enquanto couber a duração do serviço dentro do expediente
        WHILE (v_slot_start + v_service_duration) <= ((p_date + v_schedule.end_time) AT TIME ZONE v_tz) LOOP
            v_slot_end := v_slot_start + v_service_duration;

            -- Verificar se o slot está no futuro (caso a consulta seja para a data de hoje)
            IF v_slot_start > now() THEN
                -- Verificar se NÃO há sobreposição com agendamento confirmado
                IF NOT EXISTS (
                    SELECT 1
                    FROM appointments a
                    WHERE a.barber_id = p_barber_id
                      AND a.status = 'confirmed'
                      AND tstzrange(a.start_at, a.end_at) && tstzrange(v_slot_start, v_slot_end)
                )
                -- E verificar se NÃO há sobreposição com bloqueio de tempo
                AND NOT EXISTS (
                    SELECT 1
                    FROM blocked_times b
                    WHERE b.barber_id = p_barber_id
                      AND tstzrange(b.start_at, b.end_at) && tstzrange(v_slot_start, v_slot_end)
                ) THEN
                    slot_time := v_slot_start;
                    RETURN NEXT;
                END IF;
            END IF;

            -- Avançar para o próximo intervalo de agendamento (30 minutos)
            v_slot_start := v_slot_start + v_step_interval;
        END LOOP;
    END LOOP;
END;
$$;

-- Permissões de Execução da RPC Pública
GRANT EXECUTE ON FUNCTION get_available_slots(UUID, DATE, INTEGER) TO anon, authenticated, service_role;
