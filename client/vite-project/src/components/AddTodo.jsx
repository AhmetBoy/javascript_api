import { useState } from "react";
import { Loader2 } from "lucide-react";

function AddTodo({ input, setInput, onAdd, isAdding, errorShake }) {
  const [localShake, setLocalShake] = useState(false);

  const handleAddClick = () => {
    if (!input.trim()) {
      setLocalShake(true);
      setTimeout(() => setLocalShake(false), 400);
      return;
    }
    onAdd();
  };

  return (
    <div className={`flex gap-2 mb-6 ${errorShake || localShake ? 'animate-shake' : ''}`}>
      <input
        className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
        placeholder="Aklındaki yeni görevi yaz..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddClick();
        }}
        disabled={isAdding}
      />
      <button
        className={`bg-blue-600 text-white px-6 rounded-xl font-semibold flex items-center justify-center transition-all ${isAdding ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-md shadow-blue-500/30'}`}
        onClick={handleAddClick}
        disabled={isAdding}
      >
        {isAdding ? <Loader2 size={24} className="animate-spin" /> : "Ekle"}
      </button>
    </div>
  );
}

export default AddTodo;
