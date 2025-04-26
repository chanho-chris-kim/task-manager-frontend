import React, { useState } from 'react';

function TaskForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !status) return;

    onSave({ title, status });
    setTitle('');
    setStatus('');
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Incomplete">Incomplete</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
