# Barbearia Luz

Plataforma moderna de agendamento online e gestão para a **Barbearia Luz** (Nova Iguaçu - RJ).

O sistema foi concebido para oferecer aos clientes uma experiência de reserva de serviços rápida, intuitiva e sem atritos, além de fornecer um painel administrativo e de controle para barbeiros gerenciarem suas agendas e atendimentos sem risco de agendamentos conflitantes (*double booking*).

---

## 🚀 Stack Tecnológica

- **Framework Web:** [Next.js](https://nextjs.org/) (App Router com React Server Components)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (modo estrito)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend / Database:** [Supabase](https://supabase.com/) (PostgreSQL com extensão `btree_gist`)

---

## 📦 Instalação e Execução Local

### Pré-requisitos
- Node.js (versão 20 LTS ou superior recomendada)
- Gerenciador de pacotes `npm`

### 1. Clonar o repositório
```bash
git clone git@github.com:MarcosRanauro/barbearia-luz.git
cd barbearia-luz
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Copie o template de ambiente e configure suas credenciais locais do Supabase:
```bash
cp .env.example .env.local
```

Abra o arquivo `.env.local` e preencha as variáveis:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`

### 4. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🛠️ Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor local de desenvolvimento.
- **`npm run build`**: Compila a aplicação para produção e valida tipos e rotas.
- **`npm run start`**: Executa o servidor de produção compilado.
- **`npm run lint`**: Executa a verificação estática de código com o ESLint.

---

## 🏛️ Governança e Arquitetura

- [GEMINI.md](./GEMINI.md): Regras de conduta técnica, convenções de código e padrão de commits.
- [CONTEXT.md](./CONTEXT.md): Visão de negócio, catálogo de serviços e rastreamento de progresso.
- [DECISOES.md](./DECISOES.md): Histórico de Decisões de Arquitetura (ADRs).
- [CHANGELOG.md](./CHANGELOG.md): Histórico de lançamentos e versões do projeto.
