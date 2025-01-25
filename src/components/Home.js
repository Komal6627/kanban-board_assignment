import Logout from "./Logout";
import { useState } from "react";

// Temporary Home Component for authenticated users
function Home() {
  const [columns, setColumns] = useState([]);
    const [newColumn, setNewColumn] = useState("");
    const [tasks, setTasks] = useState({});
  
    const addColumn = () => {
      if (newColumn) {
        setColumns([...columns, newColumn]);
        setTasks({ ...tasks, [newColumn]: [] });
        setNewColumn("");
      }
    };
  
    const addTask = (column) => {
      const taskTitle = prompt("Enter task title:");
      if (taskTitle) {
        setTasks({
          ...tasks,
          [column]: [...tasks[column], { title: taskTitle, id: Date.now() }],
        });
      }
    };
  
    const removeColumn = (column) => {
      if (window.confirm(`Are you sure you want to remove column ${column}?`)) {
        setColumns(columns.filter((col) => col !== column));
        const newTasks = { ...tasks };
        delete newTasks[column];
        setTasks(newTasks);
      }
    };
  
    const renameColumn = (column) => {
      const newName = prompt("Enter new column name:", column);
      if (newName) {
        setColumns(columns.map((col) => (col === column ? newName : col)));
        const newTasks = { ...tasks };
        newTasks[newName] = newTasks[column];
        delete newTasks[column];
        setTasks(newTasks);
      }
    };
    return (
      <div className="relative min-h-screen">
      {/* Logout Button */}
      <div>
      <Logout  className="absolute top-4 right-4 px-4 py-2  text-white rounded-full"/>
      </div>
      
     

      <div className="flex justify-center space-x-4 p-4">
            {/* Add Column Section - Centered at the top */}
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          placeholder="New column name"
          className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addColumn}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Add Column
        </button>
      </div>

      {/* Columns Section: Centered in the middle of the screen */}
      <div className="flex justify-center space-x-6">
        {columns.map((column) => (
          <div
            key={column}
            className="w-60 p-4 bg-white border border-gray-300 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{column}</h3>
              <div className="space-x-2">
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
              className="w-full mb-2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Task
            </button>
            <div>
              {tasks[column]?.map((task) => (
                <div
                  key={task.id}
                  className="mb-2 p-2 bg-gray-100 rounded-md shadow-sm"
                >
                  <span>{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
    );
  }

  export default Home