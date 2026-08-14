# Guia de Testes

API RESTful para gestão de rebanho com validação Zod e testes E2E via Playwright.

## Rodando o servidor

```bash
npm run dev
```

Disponível em `http://localhost:3333`

## Testes

```bash
npm test              # modo headless
npm run test:ui       # modo UI interativo
npm run test:headed   # modo visível
```

Relatórios HTML em `playwright-report/`

## Endpoints

### `POST /animais`
Cadastra um animal com validação de campos:
- `nome`: apenas letras e espaços
- `raca`: apenas letras e espaços
- `lote`: alfanumérico sem espaços
- `escore`: inteiro de 1 a 5

Retorna `201` em sucesso, `400` em erro de validação.

### `POST /animais/:id/manejos`
Cadastra manejo para um animal existente:
- `tipo`: `vacinacao`, `pesagem` ou `brincagem`
- `valor`: validação específica por tipo

Retorna `201` em sucesso, `400` em erro de validação, `404` se animal não existir.

## Regras de validação

| Campo | Tipo | Regra |
|-------|------|-------|
| `nome` | string | Letras + espaços |
| `raca` | string | Letras + espaços |
| `lote` | string | Alfanumérico, sem espaços |
| `escore` | number | Inteiro 1-5 |
| Vacinação | string | Apenas letras |
| Pesagem | number | Valor numérico |
| Brincagem | string | Alfanumérico |
