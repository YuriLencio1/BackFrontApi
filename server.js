import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/usuarios", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json({
    message: "Usuário criado com sucesso",
    user,
  });
});

app.put("/usuarios/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.json({
    message: "Usuário atualizado com sucesso",
    user,
  });
});

app.delete("/usuarios/:id", async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    message: "Usuário deletado com sucesso",
    user,
  });
});

app.get("/usuarios", async (req, res) => {
  const { name, email, age } = req.query;

  const users = await prisma.user.findMany({
    where: {
      name: name || undefined,
      email: email || undefined,
      age: age ? Number(age) : undefined,
    },
  });

  res.json(users);
});

app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000");
});