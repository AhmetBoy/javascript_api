// const API_URL = "http://localhost:3000";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// GET
export const getTodos = async () => {
  const res = await fetch(`${API_URL}/todos`);
  return res.json();
};

// POST
export const addTodo = async (task) => {
  return fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
};

// DELETE
export const deleteTodo = async (id) => {
  return fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
};

// UPDATE
export const updateTodo = async (id, task) => {
  return fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
};