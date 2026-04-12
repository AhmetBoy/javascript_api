import { useState } from "react";
import { motion } from "framer-motion";

function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleSave = () => {
    if (editText.trim() && editText !== todo.title) {
      onUpdate(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
      animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
      transition={{ duration: 0.25 }}
      style={{ originY: 0 }}
      className={`flex justify-between items-center border p-2 rounded mb-2 ${todo.isTemp ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {isEditing ? (
        <input
          autoFocus
          className="border p-1 px-2 rounded w-full mr-2 text-black"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
      ) : (
        <span className="break-all mr-2">{todo.title}</span>
      )}

      <div className="flex gap-2 flex-shrink-0">
        {isEditing ? (
          <>
            <button
              className="bg-green-500 px-2 rounded text-white active:scale-95 transition-transform"
              onClick={handleSave}
            >
              Kaydet
            </button>
            <button
              className="bg-gray-400 px-2 rounded text-white active:scale-95 transition-transform"
              onClick={handleCancel}
            >
              İptal
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-yellow-400 px-2 rounded active:scale-95 transition-transform"
              onClick={() => setIsEditing(true)}
            >
              Düzenle
            </button>
            <button
              className="bg-red-500 text-white px-2 rounded active:scale-95 transition-transform"
              onClick={() => onDelete(todo.id)}
            >
              Sil
            </button>
          </>
        )}
      </div>
    </motion.li>
  );
}

export default TodoItem;
