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
    try {
      const data = await getTodos();
      if(Array.isArray(data)) setTodos(data);
    } catch (error) {
      console.error(error);
      alert("Görevler yüklenirken bir hata oluştu.");
    }
  };

  const handleAdd = async () => {
    if (!input) return;
    try {
      await addTodo(input);
      setInput("");
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert("Görev eklenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert("Görev silinirken bir hata oluştu.");
    }
  };

  const handleUpdate = async (id) => {
    const newTask = prompt("Yeni görev gir");
    if (!newTask) return;
    try {
      await updateTodo(id, newTask);
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert("Görev güncellenirken bir hata oluştu.");
    }
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