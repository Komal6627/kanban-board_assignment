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
        col.id === columnId
          ? { ...col, tasks: [...(col.tasks || []), task] }
          : col
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

  const handleTaskUpdate = (columnId, updatedTasks) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: updatedTasks || [] } : col
      )
    );
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
          : col
      )
    );
  };

  return (
    <div className="relative min-h-screen">
      <button
        onClick={() => alert("Logging out...")}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-full"
      >
        Logout
      </button>

      <div className="flex justify-center space-x-4 p-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddTask={(task) => handleAddTask(column.id, task)}
            onDeleteColumn={() => handleDeleteColumn(column.id)}
            onTaskUpdate={(updatedTasks) =>
              handleTaskUpdate(column.id, updatedTasks)
            }
            onRenameColumn={handleRenameColumn}
            onDelete={(taskId) => handleDeleteTask(column.id, taskId)}
          />
        ))}
      </div>
    </div>
  );
}
