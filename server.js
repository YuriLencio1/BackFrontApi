import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express ()
const prisma = new PrismaClient()
app.use(express.json())

const users = []

app.post('/', (req, res) =>{
    users.push(req.body)
    prisma.user.create
    console.log(users)
    res.send("Deu certo")
})



app.get('/', (req, res) => {
    res.json(users)
})

app.listen(8000)