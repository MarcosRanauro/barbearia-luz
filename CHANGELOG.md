# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [0.3.0] - 2026-11-12

### Catálogo Enriquecido, Prova Social e Padrão Dark Luxury

#### Adicionado
- **Base de Dados de Serviços Reais (`src/data/services.ts`):**
  - Catálogo estático com os 17 serviços e preços reais praticados na Barbearia Luz, divididos nas categorias Cabelo (Corte Tradicional, Pezinho, Lavagem Especial), Barba (Barba Simples, Barboterapia Completa com Ozônio, Pigmentação), Combos (Corte + Barba Tradicional, Corte + Barboterapia, Combo Master com Sobrancelha), Acabamento (Sobrancelha na Navalha, Limpeza de Pele Express) e Química (Platinado/Nevou, Luzes/Mechas, Progressiva, Hidratação, Matização, Relaxamento).
- **Prova Social e Reputação (`src/data/reviews.ts`):**
  - Depoimentos reais do Google Avaliações (Fabricio Lucas e Jonathan Matos) com classificação 5 estrelas.
  - Registro da presença recorrente de atletas e personalidades da Baixada Fluminense e RJ.
- **Componentes Refinados no Padrão Dark Luxury (`src/components/landing/`):**
  - `HeroSection`: Badges reais ("⭐ 4.9 no Google (+160 avaliações)" e "❄️ Ambiente 100% climatizado"), CTA direto para `/agendar` e canal oficial no WhatsApp ((21) 98013-4488).
  - `ServicesSection`: Navegação fluida por abas (Cabelo, Barba, Combos, Química, Acabamento) com cards detalhados, preços em centavos formatados e botão "Agendar este".
  - `BarbersSection`: Destaque dos 4 profissionais da barbearia (Renan, Mike, Davi e Leandro).
  - `ReviewsSection`: Seção dedicada com depoimentos verificados e menção a clientes VIPs.
  - `TattooAndAcademySection`: Seção visual dupla cobrindo o Estúdio de Tattoo parceiro ((21) 99228-6447) e a Academia de Formação de Barbeiros.
  - `LocationSection`: Endereço no Bairro da Luz (Rua Barão de São Félix, Nova Iguaçu - RJ), horários de funcionamento (Seg a Sáb, 09h às 19h) e link direto para rota.
  - `Footer` & `Navbar`: Rodapé e cabeçalho com links integrados e contatos atualizados.

---

## [0.2.0] - 2026-11-12

### Modelagem do Banco e Clientes Supabase

#### Adicionado
- **Migração SQL Inicial (`supabase/migrations/20261112000000_init_schema.sql`):**
  - Habilitação das extensões `uuid-ossp` e `btree_gist`.
  - Definição dos tipos ENUM `user_role` ('admin', 'barber') e `appointment_status` ('confirmed', 'completed', 'canceled', 'no_show').
  - Tabelas relacionais com chaves primárias UUID e triggers para `updated_at`: `profiles`, `services`, `clients`, `barber_schedules`, `blocked_times`, `appointments` e `appointment_services`.
  - Constraint anti-sobreposição crítica em `appointments`: `EXCLUDE USING gist (barber_id WITH =, tstzrange(start_at, end_at) WITH &&) WHERE (status IN ('confirmed'))`.
  - Habilitação de Row Level Security (RLS) com políticas estritas em todas as tabelas.
  - Função RPC `get_available_slots(p_barber_id, p_date, p_duration_minutes)` com `SECURITY DEFINER` para cálculo de disponibilidade pública sem expor dados privados de clientes.
- **Camada de Clientes Supabase (`src/lib/supabase/`):**
  - `client.ts`: Criação do cliente para browser com `createBrowserClient` (@supabase/ssr).
  - `server.ts`: Criação do cliente server para Server Components e Server Actions com `createServerClient` e gerenciamento de cookies.
  - `admin.ts`: Criação do cliente administrativo com validação de segurança que bloqueia execução em navegadores.
- **Tipagem TypeScript:**
  - Tipos gerados e estritos em `src/types/database.types.ts` cobrindo todas as tabelas, enums e funções RPC, sem uso de `any`.

---

## [0.1.0] - 2026-11-12

### Setup Inicial e Governança

#### Adicionado
- **Governança do Repositório:**
  - Criação de `GEMINI.md` definindo stack técnica oficial, proibições estritas (`any`, inline styles, vazamento de `service_role`), padrão de commits e filosofia de desenvolvimento atômico.
  - Criação de `CONTEXT.md` com os objetivos de negócio, atores do sistema, catálogo inicial de serviços e regras operacionais.
  - Criação de `DECISOES.md` registrando as primeiras ADRs de arquitetura:
    - `ADR-001`: Adoção do Next.js (App Router) e TypeScript estrito.
    - `ADR-002`: Supabase (PostgreSQL) como BaaS e persistência principal.
    - `ADR-003`: Uso da extensão `btree_gist` para restrições de exclusão temporal anti-double booking.
  - Criação de `.env.example` com templates de variáveis públicas e privadas para o Supabase.
- **Estrutura Base da Aplicação Next.js:**
  - Inicialização do Next.js 16 com App Router e React 19.
  - Configuração do TypeScript em modo estrito e alias de importação `@/*`.
  - Configuração do Tailwind CSS v4 para estilização baseada em utilitários.
  - Configuração do ESLint com `eslint-config-next`.
  - Estrutura base de diretórios sob `src/` (`src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`).
  - Documentação inicial em `README.md` com instruções de execução e scripts disponíveis.
