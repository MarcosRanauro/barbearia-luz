# Diretrizes Técnicas e Regras de Conduta - Barbearia Luz

Este documento estabelece as regras de conduta técnica, padrões de arquitetura e convenções obrigatórias para o desenvolvimento do projeto **Barbearia Luz**.

---

## 1. Stack Tecnológica Oficial

- **Framework Web:** Next.js (App Router obrigatório)
- **Linguagem:** TypeScript (modo estrito)
- **Estilização:** Tailwind CSS
- **Backend / Database:** Supabase (PostgreSQL)

---

## 2. Proibições Estritas

1. **Nunca usar `any`:**
   - Todo código TypeScript deve ser estritamente tipado.
   - Use interfaces, types explícitos, tipos utilitários ou generics.
   - Se um tipo for desconhecido, utilize `unknown` associado a type guards/validação (ex: Zod).

2. **Nunca usar estilos inline:**
   - Toda estilização deve ser feita via classes utilitárias do **Tailwind CSS**.
   - Em casos de valores dinâmicos estritamente necessários, utilize CSS variables ou configuração de classes dinâmicas seguras suportadas pelo Tailwind.
   - Não utilize o atributo `style={{ ... }}` em componentes React.

3. **Nunca expor chaves privadas (`service_role`):**
   - A chave `SUPABASE_SERVICE_ROLE_KEY` tem privilégios totais e bypass de RLS (Row Level Security).
   - Ela **nunca** deve possuir o prefixo `NEXT_PUBLIC_`.
   - Ela **nunca** deve ser importada ou usada em Client Components (`'use client'`).
   - Seu uso é restrito a rotas protegidas no servidor (Server Actions / Route Handlers) quando indispensável para tarefas administrativas.
   - No cliente, utilize exclusivamente a chave anônima pública (`NEXT_PUBLIC_SUPABASE_ANON_KEY`).

---

## 3. Padrão de Commits (Conventional Commits)

Todas as mensagens de commit devem seguir rigorosamente a especificação do [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo opcional>): <descrição clara e concisa em português ou inglês>
```

### Tipos Permitidos:
- **`feat`**: Implementação de nova funcionalidade para o usuário ou sistema.
- **`fix`**: Correção de bugs ou comportamentos inesperados.
- **`docs`**: Alterações exclusivamente em arquivos de documentação.
- **`refactor`**: Refatoração de código sem alterar o comportamento externo.
- **`chore`**: Tarefas de manutenção, atualização de dependências, configurações de build ou ferramentas.
- **`test`**: Adição ou ajuste de testes automatizados.
- **`perf`**: Alteração focada em ganho de desempenho.

### Exemplos:
- `feat(agendamento): adiciona seleção de barbeiro e data`
- `fix(auth): corrige redirecionamento após login`
- `docs: adiciona arquivos de governança do projeto`
- `chore(deps): inicializa projeto nextjs com typescript`

---

## 4. Filosofia de Desenvolvimento

1. **Tarefas Pequenas e Atômicas:**
   - Implemente um único objetivo por vez.
   - Evite grandes alterações em massa que dificultem a revisão e o rastreamento de regressões.

2. **Validação Contínua:**
   - Valide e teste a alteração localmente antes de avançar para a próxima etapa.
   - Garanta que compilação (`next build`), checagem de tipos (`tsc`) e linting passem sem erros nem avisos.

3. **Arquitetura Next.js App Router:**
   - Favoreça **Server Components** por padrão para melhor performance, SEO e segurança.
   - Isole a interatividade em **Client Components** (`'use client'`) apenas quando houver necessidade de hooks de estado (`useState`, `useEffect`), eventos de clique ou APIs do navegador.

4. **Segurança por Padrão (Security by Default):**
   - Habilite Row Level Security (RLS) em todas as tabelas criadas no Supabase.
   - Sempre valide payloads no servidor utilizando esquemas rigorosos (ex: Zod).
