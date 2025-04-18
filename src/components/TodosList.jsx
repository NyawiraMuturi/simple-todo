import React from "react";
import TodoItem from "./TodoItem";

const TodosList = (props) => {
  return (
    <div className="w-full">
      {props.todos.length === 0 ? (
        <div className="text-center p-6 text-gray-500">
          No todos yet. Add one above!
        </div>
      ) : (
        <ul>
          {props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleChangeProps={props.handleChangeProps}
              deleteTodoProps={props.deleteTodoProps}
              addTagProps={props.addTagProps}
              removeTagProps={props.removeTagProps}
              editTagProps={props.editTagProps}
              availableTags={props.availableTags}
              addNewTagProps={props.addNewTagProps}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodosList;