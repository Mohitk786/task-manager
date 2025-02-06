"use client";
import { useState, useEffect } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "@/actions/task";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    }
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    await createTask({ title, description, dueDate });
    setTitle("");
    setDescription("");
    setDueDate("");
    setTasks(await getTasks());
    setLoading(false);
  };

  const handleUpdateStatus = async (id, status) => {
    const newStatus = status === "Pending" ? "In Progress" : status === "In Progress" ? "Completed" : "Pending";
    setLoading(true);
    await updateTask(id, { status: newStatus });
    setTasks(await getTasks());
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteTask(id);
    setTasks(await getTasks());
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500">
      <div className="max-w-4xl w-full p-6 bg-white rounded-xl shadow-xl space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">Task Manager</h1>

        {/* Form to Add Task */}
        <div className="flex flex-col gap-4">
          <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          </div>
          <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          </div>
          <div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          </div>

          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mx-auto hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="max-w-4xl w-full p-6 mt-8 bg-white rounded-xl shadow-xl space-y-4">
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="loader"></div>
            <span className="text-lg text-gray-700">Loading Tasks...</span>
          </div>
        ) : (
          tasks.length > 0 &&
          tasks.map((task) => (
            <div key={task._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-200">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
              </div>

              <div className="flex space-x-3 items-center">
                <select
                  onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                  value={task.status}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 text-black font-semibold border-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
