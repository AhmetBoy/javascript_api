import { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../services/api";

import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import SkeletonLoader from "../components/SkeletonLoader";

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Loading & Optimistic UI states
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const data = await getTodos();
        if (mounted && Array.isArray(data)) setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setIsInitialLoad(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  const triggerError = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 400);
  }

  const handleAdd = async () => {
    if (!input.trim()) return;
    const taskText = input;

    // 1. Optimistic Update
    const tempId = Date.now();
    const tempTodo = { id: tempId, title: taskText, isTemp: true };
    setTodos((prev) => [...prev, tempTodo]);
    setInput("");
    setIsAdding(true);

    // 2. Perform Request
    try {
      const addedTodo = await addTodo(taskText);
      // Swap temp with real immediately
      setTodos((prev) => prev.map((t) => (t.id === tempId ? addedTodo : t)));
    } catch (error) {
      console.error(error);
      triggerError();
      // Rollback
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
      setInput(taskText); // Restore input softly
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    // 1. Optimistic Delete
    const previousTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));

    // 2. Perform Request
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
      triggerError();
      // Rollback
      setTodos(previousTodos);
    }
  };

  const handleUpdate = async (id, newTitle) => {
    // 1. Optimistic Edit
    const previousTodos = [...todos];
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, title: newTitle } : t));

    // 2. Perform Request
    try {
      await updateTodo(id, newTitle);
    } catch (error) {
      console.error(error);
      triggerError();
      // Rollback
      setTodos(previousTodos);
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
        isAdding={isAdding}
        errorShake={errorShake}
      />

      <div className="min-h-[200px]">
        {isInitialLoad ? (
          <SkeletonLoader />
        ) : (
          <TodoList
            todos={todos}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default Home;