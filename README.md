# miniMetricasPec

Projeto backend em Node.js com TypeScript para gestão de rebanho no agronegócio, construído com foco em validação estrita e testes E2E usando Playwright.

## Tecnologias

- Node.js
- TypeScript
- Express
- Zod
- Playwright
- tsx

## Estrutura do projeto

- `src/`
  - `app.ts` - configuração do Express e rotas principais
  - `server.ts` - ponto de entrada do servidor
  - `routes/animais.ts` - rotas de cadastro de animais e manejos
  - `schemas/animais.ts` - validação dos payloads com Zod
- `tests/` - testes E2E da API com Playwright
- `playwright.config.ts` - configuração de execução do Playwright
- `tsconfig.json` - configuração do compilador TypeScript
- `GUIA_DE_TESTES.md` - documentação de instalação e execução dos testes

## Regras de negócio implementadas

### `POST /animais`

Body esperado:

- `nome`: string contendo apenas letras e espaços
- `raca`: string contendo apenas letras e espaços
- `lote`: string alfanumérica sem espaços ou caracteres especiais
- `escore`: número inteiro entre `1` e `5`

Retorna `201` quando válido e `400` com mensagens detalhadas se a validação falhar.

### `POST /animais/:id/manejos`

Body esperado:

- `tipo`: um dos valores `vacinacao`, `pesagem` ou `brincagem`
- `valor`: validação dependente de `tipo`
  - `vacinacao`: somente letras
  - `pesagem`: valor numérico
  - `brincagem`: somente alfanumérico

Retorna `201` quando válido, `400` em caso de validação e `404` quando o animal não é encontrado.

## Endpoints disponíveis

- `GET /` - retorna mensagem de status da API
- `POST /animais` - cadastrar animal
- `POST /animais/:id/manejos` - cadastrar manejo para um animal existente

## Scripts úteis

- `npm run dev` - inicia o servidor em modo de desenvolvimento com `tsx watch`
- `npm run build` - compila o TypeScript em `dist/`
- `npm start` - executa o servidor compilado em `dist/`
- `npm test` - executa os testes Playwright em modo headless
- `npm run test:ui` - abre o Playwright UI para execução interativa dos testes
- `npm run test:headed` - executa os testes Playwright com browser visível

## Como rodar o projeto

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Iniciar o servidor em desenvolvimento:
   ```bash
   npm run dev
   ```
3. Verificar a API acessando:
   ```text
   http://localhost:3333
   ```

## Como testar

- Rodar todos os testes:
  ```bash
  npm test
  ```
- Rodar em modo UI:
  ```bash
  npm run test:ui
  ```
- Rodar em modo headed:
  ```bash
  npm run test:headed
  ```

## Cobertura de testes

Os testes cobrem:

- Cadastro de animal válido
- Validações negativas para `nome`, `raca`, `lote` e `escore`
- Cadastro de manejo válido para todos os tipos permitidos
- Validações negativas de `tipo` e `valor` para cada tipo de manejo
- Erro `404` quando animal não existe ao tentar cadastrar manejo

## Observações

- O projeto usa validações Zod para garantir que apenas dados corretos sejam aceitos.
- O arquivo `GUIA_DE_TESTES.md` contém um guia passo a passo mais detalhado para instalação, configuração e execução de testes.
- A API é modular e está pronta para expansão com persistência, autenticação ou mais rotas de negócio.
