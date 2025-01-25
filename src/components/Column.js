import React, { useState } from "react";
import Task from "./Task";

export default function Column({
  column,
  onAddTask,
  onDeleteColumn,
  onTaskUpdate,
  onRenameColumn,
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newColumnName, setNewColumnName] = useState(column.name);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask({ title: newTaskTitle, description: "New task" });
      setNewTaskTitle("");
    }
  };

  const handleRenameColumn = () => {
    if (newColumnName.trim()) {
      onRenameColumn(column.id, newColumnName);
      setIsEditingName(false);
    }
  };

  const cancelEditing = () => {
    setNewColumnName(column.name);
    setIsEditingName(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow w-64">
      <div className="flex justify-between items-center mb-4">
        {/* Column Name Editing */}
        {isEditingName ? (
          <div className="flex-grow flex items-center space-x-2">
            <input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              className="flex-grow px-2 py-1 border rounded"
              placeholder="Edit column name"
            />
            <button
              onClick={handleRenameColumn}
              className="px-2 py-1 text-white bg-blue-500 rounded"
            >
              Save
            </button>
            <button
              onClick={cancelEditing}
              className="px-2 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <h2
            className="text-xl font-bold cursor-pointer truncate"
            onDoubleClick={() => setIsEditingName(true)}
            title="Double-click to edit column name"
          >
            {column.name}
          </h2>
        )}

        {/* Delete Column Button */}
        {!isEditingName && (
          <button
            onClick={onDeleteColumn}
            className="ml-2 text-red-500 font-bold hover:text-red-700"
            title="Delete Column"
          >
            X
          </button>
        )}
      </div>

      {/* Tasks List */}
      <div>
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={(updatedTask) => onTaskUpdate(updatedTask)}
            onDelete={() => onTaskUpdate({ ...task, deleted: true })}
          />
        ))}
      </div>

      {/* Add Task Section */}
      <div className="mt-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={handleAddTask}
          className="w-full px-4 py-2 mt-2 bg-blue-500 text-white rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
