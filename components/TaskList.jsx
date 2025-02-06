'use client';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <button onClick={() => onUpdate(task)}>
            Mark as {task.completed ? 'Incomplete' : 'Complete'}
          </button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
