import React, {useState} from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";

const TodoContainer = () => {
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      title: "Setup development environment",
      completed: true,
      tags: ["development", "environment"],
    },
    {
      id: uuidv4(),
      title: "Develop website and add content",
      completed: false,
      tags: ["content", "website"],
    },
    {
      id: uuidv4(),
      title: "Deploy to live server",
      completed: false,
      tags: ["production", ],
    },
  ]);


  const [availableTags, setAvailableTags] = useState([
    "development",
    "environment",
    "content",
    "website",
    "production",
  ]);

  // Function to handle the change of the checkbox
  const handleChange = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return{
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    );
  }

  // Function to delete a todo item
  const delTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  }

  const addTagToTodo = (id, tag) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id && !todo.tags.includes(tag)) {
          return {
            ...todo,
            tags: [...todo.tags, tag],
          };
        }
        return todo;
      })
    );
  };

  const editTagInTodo = (todoId, oldTag, newTag) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          if(todo.tags.includes(newTag) && oldTag !== newTag) {
            return {
              ...todo,
              tags: todo.tags.filter((t) => t !== oldTag),
            }
          } else {
            return {
              ...todo,
              tags: todo.tags.map((t) => (t === oldTag ? newTag : t)),
            };
          }
        }
        return todo;
      })
    );
  }

  const removeTagFromTodo = (todoId, tagToRemove) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            tags: todo.tags.filter((t) => t !== tagToRemove),
          };
        }
        return todo;
      })
    );
  }

const addTodoItem = (title, selectedTags = []) => {
  const newTodo = {
    id: uuidv4(),
    title: title,
    completed: false,
    tags: selectedTags,
  };
  setTodos([...todos, newTodo]);
 }

 const addNewTag = (tag) => {
  if (!availableTags.includes(tag)) {
    setAvailableTags([...availableTags, tag]);
  }
 }

 const editGlobalTag = (oldTag, newTag) => {
  if (oldTag === newTag ) return;

  setTodos(
    todos.map((todo) => {
      if (todo.tags.includes(oldTag)) {
        return {
          ...todo,
          tags: todo.tags.map((tag) => (tag === oldTag ? newTag : tag)),
        };
      }
      return todo;
    })
  );
  setAvailableTags(
    availableTags.map((tag) => (tag === oldTag ? newTag : tag))
  );
 }
  

  return (
    <div className="container m-6">
      <Header />
      <InputTodo 
        addTodoProps={addTodoItem}
        availableTags={availableTags}
        addNewTag={addNewTag}
      />
      <TodosList
        todos={todos}
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        addTagProps={addTagToTodo}
        removeTagProps={removeTagFromTodo}
        editTagProps={editTagInTodo}
        availableTags={availableTags}
        addNewTagProps={addNewTag}
      />
    </div>
  );
}

export default TodoContainer



