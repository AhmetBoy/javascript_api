const todoModel = require("../models/todomodel")

const getTodos = async (req,res)=>{
 try{
  console.log("GET TODOS CALISTI");

  const todos = await todoModel.getTodos();

  console.log("DB'den veri geldi");

  res.json(todos);

 }catch(err){
  console.error(err);

  // ✅ BUNU EKLE
  res.status(500).json({ error: "Server error" });
 }
}

const createTodo = async (req,res)=>{
  console.log("CREATE CALISTI");
  console.log("BODY:", req.body);

  try{
    const title = req.body.title;

    const todo = await todoModel.createTodo(title);

    console.log("SQL CALISTI");

    res.json(todo);

  }catch(err){
    console.error("HATA:", err);
    res.status(500).json({ error: "Server error" });
  }
}

const deleteTodo = async (req,res)=>{
 try{
  const id = req.params.id
  await todoModel.deleteTodo(id)
  res.json({message:"Todo silindi"})
 }catch(err){
  console.error(err)
 }
}

const updateTodo = async (req,res)=>{
 try{
  const id = req.params.id
  const title = req.body.title
  const todo = await todoModel.updateTodo(id, title)
  res.json(todo)
 }catch(err){
  console.error(err)
 }
}

module.exports = {
 getTodos,
 createTodo,
 deleteTodo,
 updateTodo
}