# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [0.3.0] - 2026-11-12

### Utilitários de Formatação e Landing Page

#### Adicionado
- **Utilitários de Formatação (`src/lib/utils/formatters.ts`):**
  - `formatPrice`: conversão de centavos para Real formatado (`R$ 35,00`).
  - `formatDuration`: formatação de minutos para texto amigável (`30 min`, `1h 10min`).
  - `formatPhone`: máscara padrão para telefones brasileiros (`(21) 99999-0001`).
- **Componentes Visuais da Landing Page (`src/components/landing/`):**
  - `HeroSection`: headline de autoridade, badges ("4.9 estrelas no Google" e "+160 avaliações reais"), CTAs para agendamento online e contato via WhatsApp.
  - `ServicesSection`: exibição categorizada dos serviços (Cabelo, Barba, Combos, Acabamento, Química), durações, preços e links de agendamento, tipado com `database.types.ts`.
  - `BarbersSection`: apresentação dos quatro barbeiros da equipe (Renan, Mike, Davi e Leandro) com biografias, especialidades e agendamento individual.
  - `TattooStudioSection`: destaque do estúdio de tatuagem integrado, biossegurança descartável e orçamentos via WhatsApp.
  - `LocationSection`: endereço no Bairro da Luz, horários de funcionamento e atalho interativo para o Google Maps.
  - `Footer`: rodapé institucional com navegação, dados de contato e links diretos.
  - `Navbar`: menu superior responsivo fixo com navegação por âncoras e botão de ação rápida.
- **Página Principal (`src/app/(public)/page.tsx`):**
  - Composição responsiva e tema escuro elegante (preto/cinza grafite com detalhes âmbar e dourados discretos).

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
