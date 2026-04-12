import { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../services/api";
import { Sun, Moon } from "lucide-react";

import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import SkeletonLoader from "../components/SkeletonLoader";

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  
  // States
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  
  // Theme Toggle (Dark/Light)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    
    // Optimistic Update
    const tempId = Date.now();
    const tempTodo = { id: tempId, title: taskText, completed: false, isTemp: true };
    setTodos((prev) => [...prev, tempTodo]);
    setInput("");
    setIsAdding(true);

    try {
      const addedTodo = await addTodo(taskText);
      setTodos((prev) => prev.map((t) => (t.id === tempId ? addedTodo : t)));
    } catch (error) {
      console.error(error);
      triggerError();
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
      setInput(taskText); 
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    const previousTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
      triggerError();
      setTodos(previousTodos);
    }
  };

  // Yenilenmiş Update (Completed desteği var)
  const handleUpdate = async (id, newTitle, newCompleted) => {
    const previousTodos = [...todos];
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, title: newTitle, completed: newCompleted } : t));

    try {
      await updateTodo(id, newTitle, newCompleted);
    } catch (error) {
      console.error(error);
      triggerError();
      setTodos(previousTodos);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-2xl bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      
      {/* Header & Theme Toggle */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
          <div className="bg-blue-500 w-3 h-8 rounded-full"></div> 
          Görevler
        </h1>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 active:scale-95 transition-all"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <AddTodo
        input={input}
        setInput={setInput}
        onAdd={handleAdd}
        isAdding={isAdding}
        errorShake={errorShake}
      />

      <div className="min-h-[300px]">
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