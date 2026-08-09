import express from "express";
import animaisRouter from "./routes/animais.js";

export const app = express();

app.use(express.json());
app.use(animaisRouter);

app.get("/", (req, res) => {
  res.json({ message: "API de rebanho rodando. Use /animais para cadastrar animais." });
});

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});
