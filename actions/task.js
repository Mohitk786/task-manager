// app/lib/actions.js (Server Actions for CRUD Operations)
'use server';
import { connectDB } from "@/lib/db";
import Task from "@/lib/models/Task";

export async function getTasks() {
  await connectDB();
  const tasks = await Task.find().lean();
  const serializedTasks = tasks.map(task => ({
    ...task,
    _id: task._id.toString(), // Convert ObjectId to string
  }));
  console.log(serializedTasks)
  return serializedTasks;

}

export async function createTask({ title, description, dueDate }) {
  await connectDB();
  await Task.create({ title, description, dueDate});
}

export async function updateTask(id, updateData) {
  await connectDB();
  await Task.findByIdAndUpdate(id, updateData);
}

export async function deleteTask(id) {
  await connectDB();
  await Task.findByIdAndDelete(id);
}