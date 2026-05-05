import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.post("/", async (req, res) => {
  await prisma.user.create({
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

  app.put("/:id", async (req, res) => {
  await prisma.user.update({
    where: {
        id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    },
      });
});


 app.delete("/:id", async (req, res) => {
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

app.get('/', async (req, res) => {
  let users = []
  console.log("QUERY RECEBIDA:", req.query);

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
  } else {
    users = await prisma.user.findMany()
  }
    res.json(users)
})

app.listen(8000);
