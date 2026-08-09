import { Router } from "express";
import { z, ZodError } from "zod";
import { cadastroAnimalSchema, cadastroManejoSchema } from "../schemas/animais.js";

const router = Router();

interface Animal {
  id: string;
  nome: string;
  raca: string;
  lote: string;
  escore: number;
  manejos: Array<Record<string, unknown>>;
}

const animais: Animal[] = [];

const formatZodError = (error: ZodError) => ({
  error: "Validação falhou",
  details: error.errors.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  })),
});

router.post("/animais", (req, res) => {
  try {
    const animal = cadastroAnimalSchema.parse(req.body);
    const newAnimal: Animal = {
      id: String(Date.now()),
      ...animal,
      manejos: [],
    };

    animais.push(newAnimal);
    return res.status(201).json(newAnimal);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(formatZodError(error));
    }
    return res.status(500).json({ error: "Erro interno ao cadastrar animal" });
  }
});

router.post("/animais/:id/manejos", (req, res) => {
  try {
    const { id } = req.params;
    const animal = animais.find((item) => item.id === id);

    if (!animal) {
      return res.status(404).json({ error: "Animal não encontrado" });
    }

    const manejo = cadastroManejoSchema.parse(req.body);
    animal.manejos.push(manejo);

    return res.status(201).json({ ...manejo, animalId: animal.id });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(formatZodError(error));
    }
    return res.status(500).json({ error: "Erro interno ao cadastrar manejo" });
  }
});

export default router;
