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
    <div className={`flex gap-2 mb-4 ${errorShake || localShake ? 'animate-shake' : ''}`}>
      <input
        className="border p-2 rounded w-full text-black"
        placeholder="Yeni görev..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddClick();
        }}
        disabled={isAdding}
      />
      <button
        className={`bg-blue-500 text-white px-4 rounded active:scale-95 transition-transform flex items-center justify-center ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}`}
        onClick={handleAddClick}
        disabled={isAdding}
      >
        {isAdding ? <Loader2 size={24} className="animate-spin" /> : "Ekle"}
      </button>
    </div>
  );
}

export default AddTodo;
