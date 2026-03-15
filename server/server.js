const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()) // Frontend’den gelen JSON verisini okuyabilmek için gerekir. POST isteklerinde body’deki veriyi okuyabilmek için kullanılır.

app.use(cors({origin: 'http://127.0.0.1:5500'}))

const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todoapp",
    password: "Ahmet123.?!182106*/#",
    port: 5432
})





app.get("/todos", async (req,res)=>{

 try{

  const result = await pool.query(
   "SELECT * FROM todos ORDER BY id"
  )

  res.json(result.rows)

 }catch(err){
  console.error(err)
 }

})

app.post("/todos", async (req,res)=>{

 try{

  const task = req.body.task

  const result = await pool.query(
   "INSERT INTO todos(task) VALUES($1) RETURNING *",
   [task]
  )

  res.json(result.rows[0])

 }catch(err){
  console.error(err)
 }

})

app.delete("/todos/:id", async (req,res)=>{

 try{

  const id = req.params.id

  await pool.query(
   "DELETE FROM todos WHERE id=$1",
   [id]
  )

  res.json({message:"Todo silindi"})

 }catch(err){
  console.error(err)
 }

})
app.put("/todos/:id", async (req,res)=>{

 try{

  const id = req.params.id
  const task = req.body.task

  const result = await pool.query(
   "UPDATE todos SET task=$1 WHERE id=$2 RETURNING *",
   [task,id]
  )

  res.json(result.rows[0])

 }catch(err){
  console.error(err)
 }

})

app.listen(3000,()=>{
    console.log("Server started.")
})