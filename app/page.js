"use client";
import { useState, useEffect } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "@/actions/task";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    await createTask({ title, description, dueDate });
    setTitle("");
    setDescription("");
    setDueDate("");
    setTasks(await getTasks());
  };

  const handleUpdateStatus = async (id, status) => {
    const newStatus = status === "Pending" ? "In Progress" : status === "In Progress" ? "Completed" : "Pending";
    await updateTask(id, { status: newStatus });
    setTasks(await getTasks());
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(await getTasks());
  };

  console.log(tasks);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Task Manager</h1>

      {/* Form to Add Task */}
      <div className="flex flex-col">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

      <button 
        onClick={handleCreate} 
        className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full sm:w-auto mx-auto block hover:bg-blue-600 transition duration-300"
      >
        Add Task
      </button>
      </div>


      {/* Task List */}
      <ul className="mt-8 space-y-4">
        {tasks.length > 0 && tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-200">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            </div>

            <div className="flex space-x-2 items-center">
              <button 
                onClick={() => handleUpdateStatus(task._id, task.status)} 
                className={`px-4 py-2 rounded-lg text-white ${task.status === "Completed" ? "bg-green-500" : task.status === "In Progress" ? "bg-yellow-500" : "bg-red-500"} hover:bg-opacity-90 transition duration-300`}
              >
                {task.status}
              </button>

              <button 
                onClick={() => handleDelete(task._id)} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
