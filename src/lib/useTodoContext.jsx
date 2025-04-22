//ReactContext -> create Context -> provider -> useContext.
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

// Create context
const TodoContext = createContext();

const STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  QA: 'qa',
  DONE: 'done'
};

const STATUS_TITLES = {
  [STATUSES.TODO]: 'To Do',
  [STATUSES.IN_PROGRESS]: 'In Progress',
  [STATUSES.QA]: 'QA',
  [STATUSES.DONE]: 'Live in Production'
};


export const TodoProvider = ({ children }) => {

  const initialTodosData = {
    [STATUSES.TODO]: [
      {
        id: "1",
        title: "Setup development environment",
        completed: false,
        tags: ["setup", "dev"]
      },
      {
        id: "2",
        title: "Develop website and add content",
        completed: false,
        tags: ["content", "dev"]
      }
    ],
    [STATUSES.IN_PROGRESS]: [
      {
        id: "3",
        title: "Create responsive layouts",
        completed: false,
        tags: ["design"]
      }
    ],
    [STATUSES.QA]: [
      {
        id: "4",
        title: "Test user authentication",
        completed: false,
        tags: ["testing", "security"]
      }
    ],
    [STATUSES.DONE]: [
      {
        id: "5",
        title: "Project setup and repository creation",
        completed: true,
        tags: ["setup"]
      }
    ]
  };

  // Load todos from localStorage or use initial data
  const [todosByStatus, setTodosByStatus] = useState(() => {
    const storedTodos = localStorage.getItem('todosByStatus');
    return storedTodos ? JSON.parse(storedTodos) : initialTodosData;
  });


  const [availableTags, setAvailableTags] = useState(() => {
    const storedTags = localStorage.getItem('availableTags');
    return storedTags 
      ? JSON.parse(storedTags) 
      : ["setup", "dev", "content", "deployment", "bug", "feature", "urgent", "design", "testing", "security"];
  });

  useEffect(() => {
    localStorage.setItem('todosByStatus', JSON.stringify(todosByStatus));
  }, [todosByStatus]);


  useEffect(() => {
    localStorage.setItem('availableTags', JSON.stringify(availableTags));
  }, [availableTags]);

  // Toggle todo completion
  const handleChange = (id, status) => {
    setTodosByStatus(prevState => {
      const updatedTodos = {...prevState};
      
      updatedTodos[status] = updatedTodos[status].map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      
      return updatedTodos;
    });
  };

  // Delete a todo
  const delTodo = (id, status) => {
    setTodosByStatus(prevState => {
      const updatedTodos = {...prevState};
      updatedTodos[status] = updatedTodos[status].filter(todo => todo.id !== id);
      return updatedTodos;
    });
  };

  
  const addTodoItem = (title, selectedTags = []) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
      tags: selectedTags
    };
    
    setTodosByStatus(prevState => {
      return {
        ...prevState,
        [STATUSES.TODO]: [...prevState[STATUSES.TODO], newTodo]
      };
    });
  };

  // Add tag to todo
  const addTagToTodo = (todoId, tag, status) => {
    setTodosByStatus(prevState => {
      const updatedTodos = {...prevState};
      
      updatedTodos[status] = updatedTodos[status].map(todo => {
        if (todo.id === todoId && !todo.tags.includes(tag)) {
          return {
            ...todo,
            tags: [...todo.tags, tag]
          };
        }
        return todo;
      });
      
      return updatedTodos;
    });
  };

  // Remove tag from todo
  const removeTagFromTodo = (todoId, tagToRemove, status) => {
    setTodosByStatus(prevState => {
      const updatedTodos = {...prevState};
      
      updatedTodos[status] = updatedTodos[status].map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            tags: todo.tags.filter(tag => tag !== tagToRemove)
          };
        }
        return todo;
      });
      
      return updatedTodos;
    });
  };

  // Edit tag in todo
  const editTagInTodo = (todoId, oldTag, newTag, status) => {
    setTodosByStatus(prevState => {
      const updatedTodos = {...prevState};
      
      updatedTodos[status] = updatedTodos[status].map(todo => {
        if (todo.id === todoId) {
          if (todo.tags.includes(newTag) && oldTag !== newTag) {
            return {
              ...todo,
              tags: todo.tags.filter(tag => tag !== oldTag)
            };
          } else {
            return {
              ...todo,
              tags: todo.tags.map(tag => tag === oldTag ? newTag : tag)
            };
          }
        }
        return todo;
      });
      
      return updatedTodos;
    });
    
    if (!availableTags.includes(newTag)) {
      addNewTag(newTag);
    }
  };

  // Add new tag to available tags list
  const addNewTag = (tag) => {
    if (tag && !availableTags.includes(tag)) {
      setAvailableTags([...availableTags, tag]);
    }
  };

  // Edit tag name globally
  const editGlobalTag = (oldTag, newTag) => {
    if (oldTag === newTag || !newTag.trim()) return;

    setTodosByStatus(prevState => {
      const updatedTodos = {...prevState};
      
      Object.keys(updatedTodos).forEach(status => {
        updatedTodos[status] = updatedTodos[status].map(todo => {
          if (todo.tags.includes(oldTag)) {
            return {
              ...todo,
              tags: todo.tags.map(tag => tag === oldTag ? newTag : tag)
            };
          }
          return todo;
        });
      });
      
      return updatedTodos;
    });

    // Update in available tags
    setAvailableTags(
      availableTags.map(tag => tag === oldTag ? newTag : tag)
    );
  };

  // Handle drag end for dnd-kit
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id;
    const sourceContainerId = active.data.current?.containerId;
    const destinationContainerId = over.id;

    if (
      sourceContainerId === destinationContainerId && 
      todosByStatus[sourceContainerId].findIndex(item => item.id === taskId) !== -1
    ) {
      return;
    }
    
    // If dropped in a different container, move the task
    if (
      sourceContainerId !== destinationContainerId && 
      Object.values(STATUSES).includes(destinationContainerId)
    ) {
      setTodosByStatus(prevTodos => {
        const sourceItems = [...prevTodos[sourceContainerId]];
        const destinationItems = [...prevTodos[destinationContainerId]];
        
        const taskIndex = sourceItems.findIndex(item => item.id === taskId);
        if (taskIndex === -1) return prevTodos;
        
        const [movedTask] = sourceItems.splice(taskIndex, 1);
        
        destinationItems.push(movedTask);
        
        return {
          ...prevTodos,
          [sourceContainerId]: sourceItems,
          [destinationContainerId]: destinationItems
        };
      });
    }
  };

  const contextValue = {
    todosByStatus,
    availableTags,
    statuses: STATUSES,
    statusTitles: STATUS_TITLES,
    handleChange,
    delTodo,
    addTodoItem,
    addTagToTodo,
    removeTagFromTodo,
    editTagInTodo,
    addNewTag,
    editGlobalTag,
    handleDragEnd
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to consume the context
export const useTodoContext = () => {
  return useContext(TodoContext);
};
