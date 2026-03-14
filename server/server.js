const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin: 'http://127.0.0.1:5500'}))

// Frontend’den gelen JSON verisini okuyabilmek için gerekir. POST isteklerinde body’deki veriyi okuyabilmek için kullanılır.
app.use(express.json())

// geçici veri
let todos = [
  { id: 1, task: "spor yap" },
  { id: 2, task: "kitap oku" }
]

app.get("/todos" , (req, res) => {
    res.json(todos)
})

app.post("/todos", (req, res) => {
    const newTodo = {
        id: Date.now(),
        task: req.body.task
    }
    todos.push(newTodo)
    res.json(newTodo)
})

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    todos = todos.filter(todo => todo.id !== id)
    res.json({message: "Todo silindi"})
})
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const newTask = req.body.task
    const todo = todos.find(todo => todo.id === id)
    if(todo){
        todo.task = newTask
        res.json(todo)
    }else{
        res.status(404).json({message: "Todo bulunamadı"})
    }
})

app.listen(3000,()=>{
    console.log("Server started.")
})