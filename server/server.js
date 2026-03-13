const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin: 'http://127.0.0.1:5500'}))

// geçici veri
let todos = [
  { id: 1, task: "spor yap" },
  { id: 2, task: "kitap oku" }
]

app.get("/todos" , (req, res) => {
    res.json(todos)
})

app.listen(3000,()=>{
    console.log("Server started.")
})