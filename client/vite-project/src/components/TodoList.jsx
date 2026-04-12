import TodoItem from "./TodoItem";
import { AnimatePresence } from "framer-motion";

function TodoList({ todos, onDelete, onUpdate }) {
  return (
    <ul className="w-full">
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;
