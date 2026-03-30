import { useEffect, useState } from "react";
import { getTodos, deleteTodo, updateTodo, addTodo } from "../services/api";

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // 📌 SAYFA AÇILINCA VERİYİ ÇEK
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  // ➕ EKLE
  const handleAdd = async () => {
    if (!input) return;
    await addTodo(input);
    setInput("");
    fetchTodos();
  };

  // ❌ SİL
  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  // ✏️ GÜNCELLE
  const handleUpdate = async (id) => {
    const newTask = prompt("Yeni görev gir");
    if (!newTask) return;

    await updateTodo(id, newTask);
    fetchTodos();
  };

  return (
    <div>
      <h1>Todo App</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Ekle</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}

            <button onClick={() => handleDelete(todo.id)}>Sil</button>
            <button onClick={() => handleUpdate(todo.id)}>Düzenle</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;