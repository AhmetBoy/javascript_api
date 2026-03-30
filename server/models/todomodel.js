const pool = require("../config/db")

const getTodos = async () => {
 const result = await pool.query(
  "SELECT * FROM todos ORDER BY id"
 )
 return result.rows
}

const createTodo = async (task) => {
 const result = await pool.query(
  "INSERT INTO todos(task) VALUES($1) RETURNING *",
  [task]
 )
 return result.rows[0]
}

const deleteTodo = async (id) => {
 await pool.query(
  "DELETE FROM todos WHERE id=$1",
  [id]
 )
}

const updateTodo = async (id, task) => {
 const result = await pool.query(
  "UPDATE todos SET task=$1 WHERE id=$2 RETURNING *",
  [task, id]
 )
 return result.rows[0]
}

module.exports = {
 getTodos,
 createTodo,
 deleteTodo,
 updateTodo
}