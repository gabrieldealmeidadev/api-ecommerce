# Ecommerce API

API REST para e-commerce desenvolvida em Node.js com TypeScript e Express. O projeto está em fase inicial de estruturação e já conta com a base da aplicação, configuração de ambiente, Docker para PostgreSQL e organização por módulos.

## Stack atual

- Node.js
- TypeScript
- Express
- PostgreSQL via Docker
- dotenv
- tsx para desenvolvimento

## Estrutura atual do projeto

```bash
.
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
├── tsconfig.json
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── controllers/
│   ├── integrations/
│   │   ├── payments/
│   │   └── shipping/
│   ├── middlewares/
│   ├── routes/
│   ├── test/
│   └── types/
└── dist/
```

## Como o projeto está organizado

- `src/app.ts`: cria a instância do Express e configura o middleware JSON.
- `src/server.ts`: inicia o servidor e lê as variáveis de ambiente.
- `src/config/`: local para configurações gerais do projeto.
- `src/controllers/`: controladores da API.
- `src/integrations/payments/`: integrações com meios de pagamento.
- `src/integrations/shipping/`: integrações com transportadoras/entregas.
- `src/middlewares/`: middlewares personalizados.
- `src/routes/`: rotas da aplicação.
- `src/test/`: arquivos de teste.
- `src/types/`: tipos TypeScript.

## Pré-requisitos

Antes de começar, confirme que você tem instalado em sua máquina:

- Node.js 18 ou superior
- npm
- Docker Desktop ou Docker Engine
- Git

## Clonando o projeto

```bash
git clone <url-do-repositorio>
cd ecommerce-api
```

## Instalação das dependências

No diretório do projeto, execute:

```bash
npm install
```

Isso instalará as dependências listadas no `package.json`, incluindo:

- `express`
- `dotenv`
- `typescript`
- `tsx`
- tipos do Node e do Express

## Configuração de ambiente

Crie o arquivo `.env` a partir do exemplo:

### Linux/macOS

```bash
cp .env.example .env
```

### Windows (PowerShell)

```powershell
Copy-Item .env.example .env
```

### Conteúdo esperado do `.env`

```env
PORT=3000
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha_segura
POSTGRES_DB=nome_do_banco
POSTGRES_PORT=5432
```

> Use valores locais e seguros. Nunca compartilhe credenciais reais em repositórios públicos ou no README.

## Banco de dados com Docker

O projeto já contém um `docker-compose.yml` configurado para subir um container PostgreSQL.

Para subir o banco:

```bash
docker compose up -d
```

Para verificar se o container está rodando:

```bash
docker compose ps
```

Para parar o banco:

```bash
docker compose down
```

## Scripts disponíveis

O `package.json` contém os seguintes scripts:

### Desenvolvimento

```bash
npm run dev
```

Esse comando usa `tsx watch src/server.ts` para iniciar o servidor em modo de desenvolvimento com reload automático.

### Build da aplicação

```bash
npm run build
```

Esse comando compila o projeto TypeScript para a pasta `dist/`.

### Execução em produção

```bash
npm start
```

Esse comando executa o arquivo compilado em `dist/server.js`.

## Como rodar o projeto

### 1. Subir o banco

```bash
docker compose up -d
```

### 2. Configurar o arquivo `.env`

Crie o arquivo `.env` com suas próprias credenciais locais e sensíveis, seguindo o exemplo do `.env.example`.

Exemplo:

```env
PORT=3000
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha_segura
POSTGRES_DB=nome_do_banco
POSTGRES_PORT=5432
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Iniciar a aplicação em desenvolvimento

```bash
npm run dev
```

Se tudo estiver correto, o terminal deve mostrar algo como:

```bash
Server is running on port http://localhost:3000
```

## Endpoints atuais

Até este momento, a base da aplicação foi montada, mas ainda não há rotas específicas implementadas. A API atual apenas cria o app Express e habilita `express.json()`.

## Observações sobre o estado do projeto

Este projeto está em estrutura inicial. Os diretórios de rotas, controllers, middlewares, integrações e tipos já foram criados para receber o desenvolvimento futuro, mas ainda precisam ser preenchidos conforme a lógica do e-commerce.

## Próximos passos recomendados

- implementar rotas de produtos
- criar controllers de usuários, pedidos e autenticação
- configurar conexão com PostgreSQL
- criar modelos e serviços de negócio
- adicionar middlewares de erro e validação
- criar testes automatizados
- adicionar documentação dos endpoints com Swagger ou OpenAPI

## Dicas úteis

- Sempre mantenha o `.env` fora do controle de versão.
- Use `docker compose up -d` para facilitar o ambiente do banco.
- Quando alterar o código TypeScript, rode `npm run build` para validar a compilação.

## Licença

O projeto está configurado com a licença `ISC` no `package.json`.

## Resumo rápido

```bash
npm install
cp .env.example .env
# ajuste o .env

docker compose up -d
npm run dev
```

Se quiser, posso continuar e criar também um README mais profissional com badges, instruções de ambiente Windows/Linux, e uma seção de API pronta para expansão do projeto.
