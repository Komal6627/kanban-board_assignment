import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Logout from "./Logout";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [newColumn, setNewColumn] = useState("");
  const [tasks, setTasks] = useState({});
  const mockUsers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Sunny" },
    { id: 4, name: "Nitin" },
    { id: 5, name: "Komal" },
  ];

  // Add a new column
  const addColumn = () => {
    if (newColumn) {
      setColumns([...columns, newColumn]);
      setTasks({ ...tasks, [newColumn]: [] });
      setNewColumn("");
    }
  };

  // Add a task to a column
  const addTask = (column) => {
    const taskTitle = prompt("Enter task title:");
    if (!taskTitle) return;

    const taskDescription = prompt("Enter task description:");
    const userId = prompt(
      `Assign to user: Enter user ID (e.g., ${mockUsers.map((u) => u.id).join(", ")}):`
    );
    const assignedUser = mockUsers.find((user) => user.id === Number(userId));

    if (!assignedUser) {
      alert("Invalid user ID. Task not assigned to a user.");
      return;
    }

    setTasks({
      ...tasks,
      [column]: [
        ...tasks[column],
        {
          id: Date.now(),
          title: taskTitle,
          description: taskDescription || "No description provided",
          assignedTo: assignedUser,
        },
      ],
    });
  };

  // Edit an existing task
  const editTask = (column, taskId) => {
    const taskToEdit = tasks[column].find((task) => task.id === taskId);
    if (!taskToEdit) return;

    const updatedTitle = prompt("Update task title:", taskToEdit.title);
    if (!updatedTitle) return;

    const updatedDescription = prompt(
      "Update task description:",
      taskToEdit.description
    );

    const userId = prompt(
      `Reassign user: Enter user ID (e.g., ${mockUsers.map((u) => u.id).join(", ")}):`,
      taskToEdit.assignedTo?.id || ""
    );
    const assignedUser = mockUsers.find((user) => user.id === Number(userId));

    if (!assignedUser) {
      alert("Invalid user ID. Task not reassigned to a user.");
      return;
    }

    setTasks({
      ...tasks,
      [column]: tasks[column].map((task) =>
        task.id === taskId
          ? { ...task, title: updatedTitle, description: updatedDescription, assignedTo: assignedUser }
          : task
      ),
    });
  };

  // Delete a task from a column
  const deleteTask = (column, taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks({
        ...tasks,
        [column]: tasks[column].filter((task) => task.id !== taskId),
      });
    }
  };

  // Remove a column
  const removeColumn = (column) => {
    if (window.confirm(`Are you sure you want to remove column "${column}"?`)) {
      setColumns(columns.filter((col) => col !== column));
      const newTasks = { ...tasks };
      delete newTasks[column];
      setTasks(newTasks);
    }
  };

  // Rename a column
  const renameColumn = (column) => {
    const newColumnName = prompt("Enter new column name:", column);
    if (!newColumnName || newColumnName === column) return;

    setColumns(columns.map((col) => (col === column ? newColumnName : col)));

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[newColumnName] = updatedTasks[column];
      delete updatedTasks[column];
      return updatedTasks;
    });
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const columnTasks = Array.from(tasks[source.droppableId]);
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 1, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: columnTasks,
      });
    } else {
      const sourceTasks = Array.from(tasks[source.droppableId]);
      const destinationTasks = Array.from(tasks[destination.droppableId]);

      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="relative min-h-screen">
        {/* Logout Button */}
        <button
          onClick={() => alert("Logging out...")}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
        >
          <Logout />
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 my-6">
          Kanban Board
        </h1>

        {/* Add Column Section */}
        <div className="flex justify-center items-center my-6">
          <input
            type="text"
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
            placeholder="New column name"
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addColumn}
            className="px-4 py-3 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Column
          </button>
        </div>

        {/* Columns */}
        <div className="flex justify-center space-x-6 px-4">
          {columns.map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-64 p-4 bg-white border border-gray-300 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{column}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => renameColumn(column)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => removeColumn(column)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => addTask(column)}
                    className="w-full mb-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add Task
                  </button>

                  {/* Task List */}
                  <div>
                    {tasks[column]?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm"
                          >
                            <h4 className="font-semibold">{task.title}</h4>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            <p className="text-sm font-medium text-blue-500">
                              Assigned to: {task.assignedTo?.name || "Unassigned"}
                            </p>
                            <div className="flex justify-end space-x-2 mt-2">
                              <button
                                onClick={() => editTask(column, task.id)}
                                className="text-blue-500 hover:text-blue-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteTask(column, task.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
