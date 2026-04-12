const pool = require("../config/db")

const getTodos = async () => {
 const result = await pool.query(
  "SELECT * FROM todos ORDER BY id"
 )
 return result.rows
}

const createTodo = async (title) => {
try {
    const result = await pool.query(
    'INSERT INTO todos(title, completed) VALUES($1, $2) RETURNING *',
    [title, false]
    )
    console.log("DB'ye yeni todo eklendi:", result.rows[0]);
    return result.rows[0]
    }catch(err){
        console.error("Todo oluşturulurken hata oluştu:", err);
        throw err; // Hata yönetimi için hatayı tekrar fırlat
    }}

const deleteTodo = async (id) => {
 await pool.query(
  "DELETE FROM todos WHERE id=$1",
  [id]
 )
}

const updateTodo = async (id, title) => {
 const result = await pool.query(
  "UPDATE todos SET title=$1 WHERE id=$2 RETURNING *",
  [title, id]
 )
 return result.rows[0]
}

module.exports = {
 getTodos,
 createTodo,
 deleteTodo,
 updateTodo
}