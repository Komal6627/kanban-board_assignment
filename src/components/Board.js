import React, { useState } from "react";
import Column from "./Column";

export default function Board() {
  const [columns, setColumns] = useState([
    { id: 1, name: "To Do", tasks: [] },
    { id: 2, name: "In Progress", tasks: [] },
  ]);

  const handleAddTask = (columnId, task) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const handleDeleteColumn = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.filter((col) => col.id !== columnId)
    );
  };

  const handleRenameColumn = (columnId, newName) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, name: newName } : col
      )
    );
  };

  const handleTaskUpdate = (columnId, updatedTask) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              ),
            }
          : col
      )
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Logout Button */}
      <button
        onClick={() => alert("Logging out...")}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-full"
      >
        Logout
      </button>

      {/* Centered Columns */}
      <div className="flex justify-center space-x-4 p-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddTask={(task) => handleAddTask(column.id, task)}
            onDeleteColumn={() => handleDeleteColumn(column.id)}
            onTaskUpdate={(updatedTask) => handleTaskUpdate(column.id, updatedTask)}
            onRenameColumn={handleRenameColumn} // Pass the rename callback
          />
        ))}
      </div>
    </div>
  );
}
