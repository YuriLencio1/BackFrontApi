import express from 'express'

const app = express ()
app.use(express.json())

const users = []

app.post('/', (req, res) =>{
    users.push(req.body)
    console.log(users)
    res.send("Deu certo")
})


app.get('/', (req, res) => {
    res.json(users)
})

app.listen(8000)