import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTodoContext } from "../lib/useTodoContext";

const TodoItem = ({ todo, containerId }) => {
  const { 
    handleChange,
    delTodo, 
    addTagToTodo,
    removeTagFromTodo,
    editTagInTodo,
    availableTags,
    addNewTag
  } = useTodoContext();

  const [showTagSelector, setShowTagSelector] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [editTagValue, setEditTagValue] = useState("");

  const { completed, id, title, tags } = todo;

  // Set up draggable
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      containerId
    }
  });

  // Create styles for the draggable element
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1
  };

  const handleAddTag = (tag) => {
    addTagToTodo(id, tag, containerId);
  };

  const handleRemoveTag = (tag) => {
    removeTagFromTodo(id, tag, containerId);
  };

  const handleAddNewTag = () => {
    if (newTag.trim()) {
      if (!availableTags.includes(newTag.trim())) {
        addNewTag(newTag.trim());
      }
      addTagToTodo(id, newTag.trim(), containerId);
      setNewTag("");
    }
  };

  const startEditingTag = (tag) => {
    setEditingTag(tag);
    setEditTagValue(tag);
  };

  const handleEditTag = () => {
    if (editTagValue.trim() && editTagValue !== editingTag) {
      editTagInTodo(id, editingTag, editTagValue.trim(), containerId);
      setEditingTag(null);
      setEditTagValue("");
    } else {
      setEditingTag(null);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-3 rounded-md cursor-grab active:cursor-grabbing"
    >
      <div className="p-3 bg-white rounded-md border border-gray-200 relative">
        {/* Drag handle with visual indicators */}
        <div 
          {...attributes}
          {...listeners}
          className="absolute top-0 left-0 w-full h-6 cursor-grab active:cursor-grabbing flex items-center justify-center rounded-t-md hover:bg-gray-100"
        >
          <div className="w-16 h-1 bg-gray-300 rounded-full" />
        </div>
        
        <div className="mt-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => handleChange(id, containerId)}
              className="mr-3 h-4 w-4 text-blue-600"
            />
            <span 
              className={`flex-grow text-sm ${completed ? 'italic text-gray-500 line-through' : ''}`}
            >
              {title}
            </span>
          </div>
          
          <div className="flex gap-1 mt-3">
            <button 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded-md"
              onClick={() => setShowTagSelector(!showTagSelector)}
            >
              {showTagSelector ? "Hide" : "Tags"}
            </button>
            <button 
              className="bg-red-50 text-red-600 hover:bg-red-100 text-xs py-1 px-2 rounded-md"
              onClick={() => delTodo(id, containerId)}
            >
              Delete
            </button>
          </div>
          
          {/* Tag display section */}
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
                        className="text-xs px-2 py-1 focus:outline-none bg-blue-50 w-20"
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

          {/* Tag selector section */}
          {showTagSelector && (
            <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs">
              <div className="mb-2">
                <p className="text-xs text-gray-600 mb-1">Available tags:</p>
                <div className="flex flex-wrap gap-1">
                  {availableTags.map(tag => (
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
                  className="flex-grow px-2 py-1 text-xs border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                  placeholder="Add new tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNewTag()}
                />
                <button 
                  onClick={handleAddNewTag}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded-r-md"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;