import React, { useState } from "react";

const TodoItem = (props) => {
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [editTagValue, setEditTagValue] = useState("");

  const { completed, id, title, tags } = props.todo;

  const handleAddTag = (tag) => {
    props.addTagProps(id, tag);
  };

  const handleRemoveTag = (tag) => {
    props.removeTagProps(id, tag);
  };

  const handleAddNewTag = () => {
    if (newTag.trim()) {
      if (!props.availableTags.includes(newTag.trim())) {
        props.addNewTagProps(newTag.trim());
      }
      props.addTagProps(id, newTag.trim());
      setNewTag("");
    }
  };

  const startEditingTag = (tag) => {
    setEditingTag(tag);
    setEditTagValue(tag);
  };

  const handleEditTag = () => {
    if (editTagValue.trim() && editTagValue !== editingTag) {
      props.editTagProps(id, editingTag, editTagValue.trim());
      setEditingTag(null);
      setEditTagValue("");
    } else {
      setEditingTag(null);
    }
  };

  return (
    <li className="p-4 border-b border-gray-200 mb-4 rounded-md shadow-sm bg-white">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
          className="mr-3 h-5 w-5 text-blue-600"
        />
        <span 
          className={`flex-grow ${completed ? 'italic text-orange-600 opacity-40 line-through' : ''}`}
        >
          {title}
        </span>
        <button 
          className="bg-red-100 text-red-700 hover:bg-red-200 text-xs py-1 px-3 rounded-md mr-2"
          onClick={() => props.deleteTodoProps(id)}
        >
          Delete
        </button>
        <button 
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1 px-3 rounded-md"
          onClick={() => setShowTagSelector(!showTagSelector)}
        >
          {showTagSelector ? "Hide Tags" : "Tags"}
        </button>
      </div>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map(tag => (
            <div key={tag} className="flex items-center">
              {editingTag === tag ? (
                <div className="flex bg-blue-50 rounded-full overflow-hidden">
                  <input
                    type="text"
                    value={editTagValue}
                    onChange={(e) => setEditTagValue(e.target.value)}
                    className="text-xs px-2 py-1 focus:outline-none bg-blue-50 w-24"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && handleEditTag()}
                  />
                  <button 
                    onClick={handleEditTag}
                    className="bg-blue-500 text-white text-xs px-2"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                  {tag}
                  <button 
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    onClick={() => startEditingTag(tag)}
                    title="Edit tag"
                  >
                    ✎
                  </button>
                  <button 
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    onClick={() => handleRemoveTag(tag)}
                    title="Remove tag"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {showTagSelector && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md">
          <div className="mb-2">
            <p className="text-xs text-gray-600 mb-1">Available tags:</p>
            <div className="flex flex-wrap gap-1">
              {props.availableTags.map(tag => (
                <span 
                  key={tag} 
                  className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                    tags.includes(tag) 
                      ? 'bg-gray-300 text-gray-500' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => !tags.includes(tag) && handleAddTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex mt-2">
            <input
              type="text"
              className="flex-grow px-3 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
              placeholder="Add new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddNewTag()}
            />
            <button 
              onClick={handleAddNewTag}
              className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded-r-md"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;