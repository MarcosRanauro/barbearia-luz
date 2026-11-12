# Contexto do Projeto - Barbearia Luz

Este documento atua como a memória central viva do projeto **Barbearia Luz**, documentando a visão de negócio, atores, regras operacionais e o estado atual de evolução da aplicação.

---

## 1. Visão Geral e Objetivos

O projeto **Barbearia Luz** é uma plataforma web moderna e responsiva voltada para o gerenciamento e agendamento de atendimentos da barbearia.

### Principais Objetivos:
- Proporcionar aos clientes uma experiência de agendamento online rápida, intuitiva e sem atritos (sem necessidade de cadastros complexos para agendar).
- Eliminar falhas de agendamento duplo (*double booking*) por meio de garantias transacionais e temporais a nível de banco de dados.
- Permitir aos barbeiros e à administração o controle claro de suas agendas, serviços prestados, horários de trabalho e relatórios básicos de atendimento.

---

## 2. Atores e Perfis de Usuário

1. **Cliente:**
   - Visualiza serviços disponíveis, preços e durações estimadas.
   - Escolhe o barbeiro de sua preferência (ou opção "qualquer barbeiro disponível").
   - Seleciona data e horário disponíveis em tempo real.
   - Fornece nome, telefone (WhatsApp) e e-mail para confirmação e lembretes.
   - Acompanha o status de seu agendamento.

2. **Barbeiro (Profissional):**
   - Acessa seu painel pessoal de compromissos diários e semanais.
   - Define seus horários de expediente, dias de folga e intervalos (ex: almoço).
   - Marca agendamentos como concluídos, cancelados ou não comparecidos (*no-show*).

3. **Administrador (Dono/Gerente):**
   - Gerencia a equipe de barbeiros (cadastros e permissões).
   - Gerencia o catálogo de serviços (nomes, descrições, preços e durações).
   - Visualiza a agenda consolidada de toda a barbearia.
   - Configura regras gerais de funcionamento da barbearia.

---

## 3. Catálogo de Serviços e Regras de Negócio

### Serviços Típicos:
- **Corte Tradicional / Fade:** ~30-45 minutos
- **Barba Terapia / Modelagem de Barba:** ~30 minutos
- **Combo Corte + Barba:** ~60-75 minutos
- **Pezinho / Acabamento / Sobrancelha:** ~15-20 minutos

### Regras de Negócio Fundamentais:
1. **Prevenção de Sobreposição de Horários (Anti-Double Booking):**
   - Um barbeiro não pode possuir mais de um agendamento ativo no mesmo intervalo de tempo.
   - A garantia de integridade temporal deve ser reforçada no banco de dados através da extensão `btree_gist` e restrições de exclusão (`EXCLUDE USING gist`).
2. **Cálculo de Slot de Tempo:**
   - O agendamento reserva um intervalo `[hora_inicio, hora_fim)`, onde `hora_fim = hora_inicio + duracao_servico`.
3. **Janela de Funcionamento e Intervalos:**
   - Agendamentos só são aceitos dentro do horário comercial e de disponibilidade do barbeiro.
   - Intervalos de almoço ou bloqueios manuais impedem novos agendamentos no respectivo período.
4. **Ciclo de Vida do Agendamento:**
   - Estados: `pendente`, `confirmado`, `concluido`, `cancelado`.
   - Cancelamentos liberam imediatamente o slot para novos clientes.

---

## 4. Estado Atual do Projeto

- **Fase Atual:** Fase 1 — Setup e Infraestrutura Base.
- **Roteiro de Etapas:**
  - [x] **Etapa 1: Governança e Diretrizes Base** (branch `main`)
    - Regras de conduta técnica (`GEMINI.md`).
    - Definição de contexto e memória do projeto (`CONTEXT.md`).
    - Registro das decisões arquiteturais iniciais (`DECISOES.md`).
    - Template de variáveis de ambiente (`.env.example`).
  - [x] **Etapa 2: Inicialização Next.js e Tailwind CSS** (branch `feat/setup-nextjs-tailwind`)
    - Setup do Next.js (App Router, TypeScript estrito, Tailwind CSS).
    - Configuração de alias (`@/*`), ESLint e scripts de build/dev.
    - Criação do `README.md` descritivo e `CHANGELOG.md` ([0.1.0]).
  - [x] **Etapa 3: Modelagem do Banco e Migrations do Supabase** (branch `feat/supabase-schema`)
    - Configuração do client Supabase (`@supabase/ssr` e `@supabase/supabase-js`).
    - Migração SQL com RLS rigoroso (`supabase/migrations/20261112000000_init_schema.sql`).
    - Extensão `btree_gist` e constraint de exclusão temporal anti-double-booking.
    - RPC segura `get_available_slots` para cálculo de disponibilidade sem vazamento de dados.
    - Tipos TypeScript estritos em `src/types/database.types.ts`.
  - [x] **Etapa 4: Landing Page e Catálogo de Serviços** (branch `feat/landing-page`)
    - Criação de utilitários de formatação em `src/lib/utils/formatters.ts` (`formatPrice`, `formatDuration`, `formatPhone`).
    - Catálogo tipado com os 17 serviços e preços reais da casa em `src/data/services.ts` (Cabelo, Barba, Combos, Química, Acabamento).
    - Prova social real em `src/data/reviews.ts` com depoimentos do Google (Fabricio Lucas e Jonathan Matos) e menção a atletas do RJ.
    - Componentes refinados no padrão Dark Luxury em `src/components/landing/`: `HeroSection`, `ServicesSection` (navegação por abas), `BarbersSection` (Renan, Mike, Davi e Leandro), `ReviewsSection`, `TattooAndAcademySection` (Tattoo (21) 99228-6447 + Academia de Barbeiros), `LocationSection` (Rua Barão de São Félix, Seg a Sáb 09h-19h), `Footer` e `Navbar`.
    - Montagem da página principal responsiva em `src/app/(public)/page.tsx` com contatos e rota do Google Maps.
    - Tipagem rigorosa com `database.types.ts`, zero uso de `any` e zero estilos inline.
  - [ ] **Etapa 5: Fluxo de Agendamento em 4 Etapas** (branch `feat/booking-flow`)
  - [ ] **Etapa 6: Painel do Barbeiro e Administração**

---

## 5. Próximo Passo Imediato

> **Etapa 5 - Fluxo de Agendamento em 4 Etapas (branch feat/booking-flow)**
> - Construir fluxo de reserva multi-etapas interativo (Seleção de Serviços -> Barbeiro -> Data/Horário -> Dados do Cliente).
> - Integrar RPC `get_available_slots` para consulta de horários disponíveis em tempo real.
> - Transação atômica de criação de agendamento com tratamento do erro da constraint anti-double booking.
