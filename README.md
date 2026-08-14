# miniMetricasPec

Projeto backend em Node.js com TypeScript para gestão de rebanho no agronegócio, com validação estrita via Zod e testes E2E via Playwright.

> 📚 **Desafio da Mentoria 2.0** com Júlio de Lima — Projeto desenvolvido como portfólio demonstrando boas práticas em validação, testes e arquitetura.

## 🛠️ Tecnologias

Node.js • TypeScript • Express • Zod • Playwright • tsx

## 📁 Estrutura do projeto

```
src/
  app.ts              # Configuração Express
  server.ts           # Ponto de entrada
  routes/animais.ts   # Rotas (POST /animais, POST /animais/:id/manejos)
  schemas/animais.ts  # Validação Zod
tests/
  animal.spec.ts      # Testes E2E Playwright
```

## 🚀 Quick Start

```bash
npm install
npm run dev          # Servidor em http://localhost:3333
```

## 🧪 Testes

Testes E2E com cobertura completa de validações e fluxos de negócio:

```bash
npm test              # Modo headless
npm run test:ui       # Modo UI interativo
npm run test:headed   # Com browser visível
```

**Cobertura:**
- ✅ Cadastro de animal com validações (nome, raca, lote, escore)
- ✅ Cadastro de manejo com tipo específico (vacinacao, pesagem, brincagem)
- ✅ Validações negativas para cada campo
- ✅ Erro 404 quando animal não existe
- ✅ Respostas estruturadas com mensagens claras

Ver [GUIA_DE_TESTES.md](GUIA_DE_TESTES.md) para detalhes sobre as regras de validação.

## 🔌 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/` | Status da API |
| `POST` | `/animais` | Cadastrar animal |
| `POST` | `/animais/:id/manejos` | Adicionar manejo |

## 📋 Scripts

| Comando | Função |
|---------|--------|
| `npm run dev` | Servidor com watch |
| `npm run build` | Compilar TypeScript |
| `npm start` | Rodar compilado |
| `npm test` | Rodar testes |

## ✔️ Validações implementadas

Consulte [GUIA_DE_TESTES.md](GUIA_DE_TESTES.md) para a tabela completa de regras (nome, raca, lote, escore, tipos de manejo e valores).

A API é modular e pronta para expansão com persistência, autenticação e mais endpoints.

By Kasé Santos
