import { z } from "zod";

const lettersAndSpaces = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
const alphanumeric = /^[A-Za-z0-9]+$/;
const lettersOnly = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;

export const cadastroAnimalSchema = z.object({
  nome: z.string().min(1, "nome é obrigatório").regex(lettersAndSpaces, "nome deve conter apenas letras e espaços"),
  raca: z.string().min(1, "raca é obrigatória").regex(lettersAndSpaces, "raca deve conter apenas letras e espaços"),
  lote: z.string().min(1, "lote é obrigatório").regex(alphanumeric, "lote deve ser alfanumérico sem espaços"),
  escore: z.number({ invalid_type_error: "escore deve ser um número inteiro entre 1 e 5" })
    .int("escore deve ser um número inteiro")
    .min(1, "escore deve ser no mínimo 1")
    .max(5, "escore deve ser no máximo 5"),
});

const manejoBaseSchema = z.object({
  tipo: z.enum(["vacinacao", "pesagem", "brincagem"]),
});

const vacinacaoSchema = manejoBaseSchema.extend({
  tipo: z.literal("vacinacao"),
  valor: z.string().min(1, "valor é obrigatório").regex(lettersOnly, "valor deve conter apenas letras para vacinacao"),
});

const pesagemSchema = manejoBaseSchema.extend({
  tipo: z.literal("pesagem"),
  valor: z.preprocess((value) => {
    if (typeof value === "string" && value.trim() !== "") {
      return Number(value);
    }
    return value;
  }, z.number({ invalid_type_error: "valor deve ser numérico para pesagem" })),
});

const brincagemSchema = manejoBaseSchema.extend({
  tipo: z.literal("brincagem"),
  valor: z.string().min(1, "valor é obrigatório").regex(alphanumeric, "valor deve ser alfanumérico para brincagem"),
});

export const cadastroManejoSchema = z.discriminatedUnion("tipo", [
  vacinacaoSchema,
  pesagemSchema,
  brincagemSchema,
]);

export type CadastroAnimalInput = z.infer<typeof cadastroAnimalSchema>;
export type CadastroManejoInput = z.infer<typeof cadastroManejoSchema>;
