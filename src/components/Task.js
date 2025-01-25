import React, { useState } from "react";

export default function Task({ task, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    onEdit({ ...task, title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-2">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border p-1 rounded w-full mb-2"
            placeholder="Edit title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border p-1 rounded w-full"
            placeholder="Edit description"
          />
          <div className="mt-2 flex space-x-2">
            <button onClick={handleSave} className="text-green-500">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500">Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p className="text-sm">{task.description}</p>
          <div className="mt-2 flex space-x-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-500">Edit</button>
            <button onClick={onDelete} className="text-red-500">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
