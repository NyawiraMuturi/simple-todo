import React, { useState } from "react";
import { useTodoContext } from "../lib/useTodoContext";

const InputTodo = () => {
  const { addTodoItem, availableTags, addNewTag } = useTodoContext();
  
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [newTag, setNewTag] = useState("");

  const onChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim()) {
      addTodoItem(title, selectedTags);
      setTitle("");
      setSelectedTags([]);
      setShowTagSelector(false);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag.trim())) {
      addNewTag(newTag.trim());
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag("");
    } else if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex rounded-md shadow-md mb-4">
        <input
          type="text"
          className="py-2 px-4 rounded-l-md flex-grow focus:outline-none"
          placeholder="Add todo..."
          value={title}
          name="title"
          onChange={onChange}
        />
        <input 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 cursor-pointer rounded-r-md"
          value="Add Task" 
        />
      </form>

      <div className="mb-2 flex items-center">
        <button 
          type="button" 
          onClick={() => setShowTagSelector(!showTagSelector)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm"
        >
          {showTagSelector ? "Hide Tags" : "Select Tags"}
        </button>
        
        {selectedTags.length > 0 && (
          <div className="ml-3 flex flex-wrap gap-1">
            {selectedTags.map(tag => (
              <span 
                key={tag} 
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
                <button 
                  className="ml-1 text-blue-500 hover:text-blue-700"
                  onClick={() => toggleTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {showTagSelector && (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Select tags:</p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <span 
                  key={tag} 
                  className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                    selectedTags.includes(tag) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex mt-3">
            <input
              type="text"
              className="flex-grow px-3 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
              placeholder="Add new tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddNewTag()}
            />
            <button 
              type="button" 
              onClick={handleAddNewTag}
              className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded-r-md"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputTodo;