# GUIA_DE_TESTES

## 1. Objetivo

Este projeto implementa uma API RESTful para gestão de rebanho no agronegócio. A arquitetura é modular, com validações usando Zod, e testes E2E com Playwright para garantir que todos os fluxos principais e as regras de validação sejam cobertos.

## 2. Preparando o projeto do zero

1. Abra o terminal no diretório do projeto:
   ```bash
   cd "c:/Users/kases/OneDrive/Desktop/Minhas Coisas/Projetos/miniMetricasPec"
   ```
2. Inicialize o `package.json` (caso não exista):
   ```bash
   npm init -y
   ```
3. Instale as dependências da API:
   ```bash
   npm install express zod
   ```
4. Instale as dependências de desenvolvimento:
   ```bash
   npm install -D typescript ts-node-dev @types/node @types/express @playwright/test
   ```
5. Gere o `tsconfig.json` se não existir:
   ```bash
   npx tsc --init
   ```

## 3. Estrutura de arquivos gerada

- `package.json` - scripts e dependências.
- `tsconfig.json` - configuração do TypeScript.
- `src/app.ts` - configuração principal do Express.
- `src/server.ts` - ponto de entrada do servidor.
- `src/routes/animais.ts` - rotas da API e regras de negócio.
- `src/schemas/animais.ts` - schemas Zod para validação.
- `tests/animal.spec.ts` - testes E2E Playwright.
- `playwright.config.ts` - configuração do Playwright.

## 4. Como levantar o servidor localmente

1. Com o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
2. O servidor estará disponível em:
   ```plain
   http://localhost:3333
   ```

## 5. Configuração do Playwright para testes de API

- O arquivo `playwright.config.ts` define:
  - `testDir`: diretório `tests`
  - `baseURL`: `http://localhost:3333`
  - cabeçalhos HTTP padrão para JSON
  - relatórios `html` em `playwright-report`

- Os testes utilizam `playwright.request.newContext` para chamadas HTTP diretas à API.

## 6. Comandos para rodar os testes

- Executar todos os testes em modo headless:
  ```bash
  npm test
  ```
- Executar testes em modo UI:
  ```bash
  npm run test:ui
  ```
- Executar testes em modo headed:
  ```bash
  npm run test:headed
  ```

## 7. Resumo dos testes construídos

### 7.1 Testes de cadastro de animal (`POST /animais`)

- caminho feliz:
  - valida `nome`, `raca`, `lote` e `escore` corretos.
- cenários de erro:
  - `nome` inválido com número ou caractere especial.
  - `raca` inválida com caractere especial.
  - `lote` inválido com espaço.
  - `escore` inválido quando não inteiro ou fora do intervalo.

### 7.2 Testes de cadastro de manejo (`POST /animais/:id/manejos`)

- caminho feliz:
  - `vacinacao` com valor alfabético.
  - `pesagem` com valor numérico.
  - `brincagem` com valor alfanumérico.
- cenários de erro:
  - `tipo` inválido não aceito.
  - `vacinacao` com valor contendo número.
  - `pesagem` com valor não numérico.
  - `brincagem` com valor contendo espaço.
  - animal não encontrado para cadastro de manejo.

## 8. Verificação de qualidade e boas práticas

- Validação de entrada está centralizada em `src/schemas/animais.ts`.
- Rotas retornam `400` em falhas de validação com mensagens claras.
- Rotas retornam `404` para animal inexistente.
- Testes E2E cobrem tanto fluxo positivo quanto todos os cenários negativos de validação.
