# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
