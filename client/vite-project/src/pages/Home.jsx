import { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../services/api";

import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!input) return;
    await addTodo(input);
    setInput("");
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleUpdate = async (id) => {
    const newTask = prompt("Yeni görev gir");
    if (!newTask) return;
    await updateTodo(id, newTask);
    fetchTodos();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Todo App
      </h1>

      <AddTodo
        input={input}
        setInput={setInput}
        onAdd={handleAdd}
      />

      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Home;