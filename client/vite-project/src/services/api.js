// const API_URL = "http://localhost:3000";
const API_URL = import.meta.env.VITE_API_URL;

// GET
export const getTodos = async () => {
  const res = await fetch(`${API_URL}/todos`);
  return res.json();
};

// POST
export const addTodo = async (title) => {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
};

// DELETE
export const deleteTodo = async (id) => {
  return fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
};

// UPDATE
export const updateTodo = async (id, title) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
};