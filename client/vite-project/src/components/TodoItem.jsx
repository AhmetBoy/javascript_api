import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, MoreVertical, Edit2, Trash2 } from "lucide-react";

function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText, todo.completed);
    }
    setIsEditing(false);
  };

  const handleToggleCheck = () => {
    onUpdate(todo.id, todo.title, !todo.completed);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, scale: 0.95, overflow: "hidden" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`border p-3 rounded-xl mb-3 flex items-center shadow-sm transition-colors duration-500 relative ${
        todo.isTemp ? 'opacity-50 pointer-events-none' : ''
      } ${
        todo.completed 
          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
          : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Animated Circular Checkbox */}
      <button 
        onClick={handleToggleCheck}
        className={`flex-shrink-0 w-[22px] h-[22px] rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
          todo.completed 
            ? 'bg-green-500 border-green-500 text-white shadow-md shadow-green-500/20' 
            : 'border-gray-300 dark:border-gray-500 text-transparent hover:border-green-400'
        }`}
      >
        <Check size={14} strokeWidth={4} className={`transition-all duration-300 ${todo.completed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
      </button>

      {/* Text Data / Inline Input */}
      <div className="flex-1 min-w-0 mr-2">
        {isEditing ? (
          <input
            autoFocus
            className="border-b-2 border-blue-500 bg-transparent text-gray-900 dark:text-white p-1 px-2 w-full focus:outline-none transition-all placeholder-gray-400"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") {
                setEditText(todo.title);
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <span className={`block break-words text-[15px] font-medium transition-all duration-500 ${
            todo.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-800 dark:text-gray-100'
          }`}>
            {todo.title}
          </span>
        )}
      </div>

      {/* Action Menu Area */}
      <div className="flex-shrink-0 flex items-center gap-1 relative" ref={menuRef}>
        {isEditing ? (
          <>
            <button
              className="p-1.5 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 hover:bg-green-200 transition-colors"
              onClick={handleSave}
            >
              <Check size={18} />
            </button>
            <button
              className="p-1.5 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 hover:bg-red-200 transition-colors"
              onClick={() => { setEditText(todo.title); setIsEditing(false); }}
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <MoreVertical size={20} />
          </button>
        )}

        {/* Floating Dropdown Menü */}
        <AnimatePresence>
          {menuOpen && !isEditing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-10 mt-1 w-36 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-20"
            >
              <button
                onClick={() => { setIsEditing(true); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 transition-colors"
              >
                <Edit2 size={15} /> Düzenle
              </button>
              <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-700/50"></div>
              <button
                onClick={() => { onDelete(todo.id); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
              >
                <Trash2 size={15} /> Sil
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

export default TodoItem;
