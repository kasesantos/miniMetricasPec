import { test, expect, request, type APIRequestContext } from "@playwright/test";

const baseURL = "http://localhost:3333";

test.describe("API de Rebanho - Animais e Manejos", () => {
  let apiRequestContext: APIRequestContext;
  let createdAnimalId: string;

  test.beforeAll(async ({ playwright }) => {
    apiRequestContext = await playwright.request.newContext({ baseURL });
  });

  test.afterAll(async () => {
    await apiRequestContext.dispose();
  });

  test("caminho feliz: cria animal válido", async () => {
    const response = await apiRequestContext.post("/animais", {
      data: {
        nome: "Boi do Sul",
        raca: "Zebu",
        lote: "Lote123",
        escore: 4,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      nome: "Boi do Sul",
      raca: "Zebu",
      lote: "Lote123",
      escore: 4,
      manejos: [],
    });
    expect(body.id).toBeTruthy();
    createdAnimalId = body.id;
  });

  test("erro de validação: nome com número ou caractere especial", async () => {
    const response = await apiRequestContext.post("/animais", {
      data: {
        nome: "Boi123",
        raca: "Zebu",
        lote: "Lote123",
        escore: 3,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "nome",
          message: "nome deve conter apenas letras e espaços",
        }),
      ]),
    );
  });

  test("erro de validação: raça com caractere especial", async () => {
    const response = await apiRequestContext.post("/animais", {
      data: {
        nome: "Boi do Sul",
        raca: "Zebu#1",
        lote: "Lote123",
        escore: 3,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "raca",
          message: "raca deve conter apenas letras e espaços",
        }),
      ]),
    );
  });

  test("erro de validação: lote com espaço ou caractere especial", async () => {
    const response = await apiRequestContext.post("/animais", {
      data: {
        nome: "Boi do Sul",
        raca: "Zebu",
        lote: "Lote 123",
        escore: 3,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "lote",
          message: "lote deve ser alfanumérico sem espaços",
        }),
      ]),
    );
  });

  test("erro de validação: escore fora do intervalo e não inteiro", async () => {
    const response = await apiRequestContext.post("/animais", {
      data: {
        nome: "Boi do Sul",
        raca: "Zebu",
        lote: "Lote123",
        escore: 5.5,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "escore",
          message: "escore deve ser um número inteiro",
        }),
      ]),
    );
  });

  test.describe("manejos do animal", () => {
    test.beforeAll(async () => {
      if (!createdAnimalId) {
        const response = await apiRequestContext.post("/animais", {
          data: {
            nome: "Boi do Norte",
            raca: "Nelore",
            lote: "Norte01",
            escore: 2,
          },
        });
        const body = await response.json();
        createdAnimalId = body.id;
      }
    });

    test("caminho feliz: registro de vacinação válido", async () => {
      const response = await apiRequestContext.post(
        `/animais/${createdAnimalId}/manejos`,
        {
          data: {
            tipo: "vacinacao",
            valor: "Aftosa",
          },
        },
      );

      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body).toMatchObject({
        tipo: "vacinacao",
        valor: "Aftosa",
        animalId: createdAnimalId,
      });
    });

    test("caminho feliz: registro de pesagem válido", async () => {
      const response = await apiRequestContext.post(
        `/animais/${createdAnimalId}/manejos`,
        {
          data: {
            tipo: "pesagem",
            valor: 450.5,
          },
        },
      );

      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body).toMatchObject({
        tipo: "pesagem",
        valor: 450.5,
        animalId: createdAnimalId,
      });
    });

    test("caminho feliz: registro de brincagem válido", async () => {
      const response = await apiRequestContext.post(
        `/animais/${createdAnimalId}/manejos`,
        {
          data: {
            tipo: "brincagem",
            valor: "BRINCO123",
          },
        },
      );

      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body).toMatchObject({
        tipo: "brincagem",
        valor: "BRINCO123",
        animalId: createdAnimalId,
      });
    });

    test("erro de validação: tipo inválido não permitido", async () => {
      const response = await apiRequestContext.post(
        `/animais/${createdAnimalId}/manejos`,
        {
          data: {
            tipo: "curativo",
            valor: "Aftosa",
          },
        },
      );

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.details.some((item: any) => item.path === "tipo")).toBe(true);
    });

    test("erro de validação: vacinacao com valor numérico", async () => {
      const response = await apiRequestContext.post(
        `/animais/${createdAnimalId}/manejos`,
        {
          data: {
            tipo: "vacinacao",
            valor: "Aftosa1",
          },
        },
      );

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: "valor",
            message: "valor deve conter apenas letras para vacinacao",
          }),
        ]),
      );
    });

    test("erro de validação: pesagem com valor não numérico", async () => {
      const response = await apiRequestContext.post(
        `/animais/${createdAnimalId}/manejos`,
        {
          data: {
            tipo: "pesagem",
            valor: "quatrocinco",
          },
        },
      );

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: "valor",
            message: "valor deve ser numérico para pesagem",
          }),
        ]),
      );
    });

    test("erro de validação: brincagem com valor com caracteres inválidos", async () => {
      const response = await apiRequestContext.post(
        `/animais/${createdAnimalId}/manejos`,
        {
          data: {
            tipo: "brincagem",
            valor: "BRINCO 123",
          },
        },
      );

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: "valor",
            message: "valor deve ser alfanumérico para brincagem",
          }),
        ]),
      );
    });

    test("erro 404: animal não encontrado ao cadastrar manejo", async () => {
      const response = await apiRequestContext.post(
        "/animais/animal-invalido/manejos",
        {
          data: {
            tipo: "pesagem",
            valor: 300,
          },
        },
      );

      expect(response.status()).toBe(404);
      const body = await response.json();
      expect(body).toEqual({ error: "Animal não encontrado" });
    });
  });
});
