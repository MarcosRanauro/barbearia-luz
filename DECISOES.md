# Registro de Decisões de Arquitetura (ADRs) - Barbearia Luz

Este documento registra formalmente as decisões de arquitetura e tecnologia adotadas no projeto **Barbearia Luz**, contextualizando o motivo de cada escolha, alternativas consideradas e suas consequências.

---

## Índice de Decisões

- [ADR-001: Adoção do Next.js com App Router e TypeScript](#adr-001-adoção-do-nextjs-com-app-router-e-typescript)
- [ADR-002: Supabase (PostgreSQL) como Backend e Banco de Dados Principal](#adr-002-supabase-postgresql-como-backend-e-banco-de-dados-principal)
- [ADR-003: Uso da Extensão btree_gist no PostgreSQL para Prevenção de Conflito de Horários](#adr-003-uso-da-extensão-btree_gist-no-postgresql-para-prevenção-de-conflito-de-horários)

---

## ADR-001: Adoção do Next.js com App Router e TypeScript

- **Status:** Aceito
- **Data:** 2026-11-12
- **Decisores:** Time de Desenvolvimento / Engenharia

### Contexto
O sistema da Barbearia Luz requer interfaces públicas de alta performance e excelente SEO (para captação de clientes locais via busca orgânica), além de painéis interativos protegidos para barbeiros e administradores. Necessitamos de um ecossistema full-stack coeso, moderno e seguro, com tipagem estrita para reduzir falhas em tempo de execução.

### Decisão
Adotar o **Next.js** com a arquitetura **App Router** e **TypeScript** estrito como a plataforma unificada da aplicação.
- Componentes do servidor (React Server Components - RSC) como padrão para carregamento de dados e renderização inicial ultra-rápida.
- Server Actions e Route Handlers para lógica de mutação e integração com serviços externos.
- TypeScript em modo estrito em todo o repositório, proibindo o uso do tipo `any`.

### Consequências
- **Positivas:**
  - Código compartilhado e contratos de tipagem consistentes entre front e back.
  - Carregamento inicial veloz para os clientes da barbearia, reduzindo taxas de rejeição.
  - Maior segurança: lógica sensível e queries de banco podem ser mantidas no servidor sem expor detalhes da infraestrutura ao navegador.
- **Negativas / Desafios:**
  - Exige disciplina no gerenciamento da fronteira entre Server Components e Client Components (`'use client'`).

---

## ADR-002: Supabase (PostgreSQL) como Backend e Banco de Dados Principal

- **Status:** Aceito
- **Data:** 2026-11-12
- **Decisores:** Time de Desenvolvimento / Engenharia

### Contexto
A aplicação necessita de persistência relacional robusta (barbeiros, clientes, serviços, agendamentos), autenticação segura para administração e barbeiros, e políticas finas de controle de acesso a dados. Uma solução Backend-as-a-Service (BaaS) baseada em PostgreSQL maduro acelera a entrega e reduz complexidade operacional.

### Decisão
Utilizar o **Supabase** como a camada de dados e serviços de backend:
- **PostgreSQL nativo:** Garante conformidade ACID e integridade referencial.
- **Supabase Auth:** Autenticação gerenciada para barbeiros e administradores.
- **Row Level Security (RLS):** Garantia de isolamento e controle de permissões a nível de tabela diretamente no banco.
- **Client Libraries:** Integração segura utilizando `@supabase/ssr` e `@supabase/supabase-js`.

### Consequências
- **Positivas:**
  - Acelera o desenvolvimento eliminando a necessidade de construir um servidor de autenticação do zero.
  - Permite evolução futura para recursos de tempo real (Supabase Realtime) para atualização imediata da grade de horários.
  - Banco relacional padrão SQL de mercado, sem aprisionamento proprietário impeditivo.
- **Negativas / Desafios:**
  - Atenção estrita ao não vazamento de `SUPABASE_SERVICE_ROLE_KEY` para o frontend.
  - Toda tabela deve obrigatoriamente possuir políticas de RLS ativas e testadas.

---

## ADR-003: Uso da Extensão btree_gist no PostgreSQL para Prevenção de Conflito de Horários

- **Status:** Aceito
- **Data:** 2026-11-12
- **Decisores:** Time de Desenvolvimento / Engenharia

### Contexto
Em sistemas de agendamento, condições de corrida (*race conditions*) e *double booking* são os problemas mais críticos. Se dois clientes tentarem reservar o mesmo barbeiro no mesmo horário simultaneamente, checagens puramente no nível da aplicação (`SELECT` seguido de `INSERT`) falham sob concorrência devido a janelas de tempo entre a verificação e a gravação.

### Decisão
Habilitar a extensão **`btree_gist`** no PostgreSQL do Supabase e criar uma restrição de exclusão (`EXCLUSION CONSTRAINT`) baseada em intervalos de tempo (`tsrange` ou `tstzrange`):
```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE agendamentos
ADD CONSTRAINT no_overlapping_appointments
EXCLUDE USING gist (
  barbeiro_id WITH =,
  periodo WITH &&
)
WHERE (status != 'cancelado');
```

### Consequências
- **Positivas:**
  - **Garantia matemática a nível de banco de dados:** Impossível haver sobreposição de agendamentos para o mesmo barbeiro, mesmo sob altíssima concorrência.
  - Elimina complexidade de locks manuais distribuídos ou tabelas de bloqueio na aplicação.
  - Performance otimizada por meio de índices GiST para consultas de disponibilidade de intervalos livres.
- **Negativas / Desafios:**
  - A extensão `btree_gist` deve ser expressamente ativada nas migrações do banco.
  - A aplicação deve tratar adequadamente o erro de violação de constraint (`23P01: exclusion_violation`) e retornar uma mensagem amigável ao usuário (ex: *"Este horário acabou de ser reservado por outro cliente. Por favor, selecione outro horário."*).
