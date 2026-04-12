function AddTodo({ input, setInput, onAdd }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 rounded w-full text-black"
        placeholder="Yeni görev..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={onAdd}
      >
        Ekle
      </button>
    </div>
  );
}

export default AddTodo;