const todoModel = require("../models/todomodel")

const getTodos = async (req,res)=>{
 try{
    console.log("GET TODOS CALISTI");
  const todos = await todoModel.getTodos()
  console.log("DB'den veri geldi");
  res.json(todos)
 }catch(err){
  console.error(err)
 }
}

const createTodo = async (req,res)=>{
 try{
  const task = req.body.task
  const todo = await todoModel.createTodo(task)
  res.json(todo)
 }catch(err){
  console.error(err)
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
  const task = req.body.task
  const todo = await todoModel.updateTodo(id,task)
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