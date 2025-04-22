import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../lib/useTodoContext";

const StatusColumn = ({ id, title }) => {
  const { todosByStatus } = useTodoContext();
  const todos = todosByStatus[id] || [];
  
  const { setNodeRef, isOver } = useDroppable({
    id
  });

  return (
    <div className="flex-1 min-w-64 bg-gray-100 rounded-md p-4 shadow-sm">
      <h3 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-300 flex justify-between items-center">
        {title}
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
          {todos.length}
        </span>
      </h3>
      
      <div
        ref={setNodeRef}
        className={`min-h-72 transition-colors ${
          isOver ? 'bg-blue-50' : ''
        }`}
      >
        {todos.length === 0 ? (
          <div className="text-center p-4 text-gray-400 italic text-sm border-2 border-dashed border-gray-300 rounded-md">
            Drag tasks here
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              containerId={id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StatusColumn;