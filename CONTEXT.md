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

- **Fase Atual:** Fase 0 — Governança e Inicialização.
- **Status:**
  - [x] Criação de diretrizes técnicas (`GEMINI.md`).
  - [x] Definição de contexto e memória do projeto (`CONTEXT.md`).
  - [x] Registro das decisões arquiteturais iniciais (`DECISOES.md`).
  - [x] Template de variáveis de ambiente (`.env.example`).
  - [ ] Inicialização da aplicação Next.js (App Router + TS + Tailwind).
  - [ ] Configuração do Supabase, schema SQL, migrations e RLS.
  - [ ] Implementação do fluxo de agendamento público e painel administrativo.
