import React, {useState} from "react";
import { DndContext , closestCorners} from "@dnd-kit/core";
import StatusColumn from "./StatusColumn";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { useTodoContext } from "../lib/useTodoContext";

const TodoContainer = () => {
  const { handleDragEnd, statuses, statusTitles,  } = useTodoContext();
  

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Header />
      <InputTodo />
      
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-wrap gap-4">
          {Object.values(statuses).map(status => (
            <StatusColumn 
              key={status} 
              id={status}
              title={statusTitles[status]} 
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};


export default TodoContainer



