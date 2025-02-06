'use client';

import React, { useState } from 'react';
import { createTask } from '@/actions/task';

const TaskForm = () => {
 const [taskData, setTaskData] = useState({ title: '', description: '', dueDate: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskData)
    const task = await createTask(taskData);
    console.log("printing task", task);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={taskData.description}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}  
        required
      />
      <input
        type="date"
        value={taskData.dueDate}
        onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
        required
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
