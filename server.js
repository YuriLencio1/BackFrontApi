import express from 'express'

const app = express ()

app.get('/', (req, res) => {
    res.send("Olá. bem vindo :)")
})

app.listen(8000)