function TodoItem({ todo, onDelete, onUpdate }) {
  return (
    <li className="flex justify-between items-center border p-2 rounded mb-2">
      <span>{todo.task}</span>

      <div className="flex gap-2">
        <button
          className="bg-yellow-400 px-2 rounded"
          onClick={() => onUpdate(todo.id)}
        >
          Düzenle
        </button>

        <button
          className="bg-red-500 text-white px-2 rounded"
          onClick={() => onDelete(todo.id)}
        >
          Sil
        </button>
      </div>
    </li>
  );
}

export default TodoItem;