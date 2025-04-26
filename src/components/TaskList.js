import React, { useState } from 'react';

function TaskList({ tasks, onUpdateStatus, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  const handleEdit = (id, title, status) => {
    setEditingId(id);
    setEditedTitle(title);
    setEditedStatus(status);
  };

  const handleStatusChange = (newStatus) => {
    setEditedStatus(newStatus);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);  
  };

  const handleSave = () => {
    onUpdateStatus(editingId, editedTitle, editedStatus);  
    setEditingId(null);   
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id} style={{ marginBottom: '1rem' }}>
          {editingId === task.id ? (
            // Editing mode: show input field for title and dropdown for status
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={handleTitleChange}
                style={{ marginRight: '1rem' }}
              />
              <select
                value={editedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{ marginRight: '1rem' }}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={() => handleSave()} style={{ marginLeft: '1rem' }}>
                Save
              </button>
            </div>
          ) : (
            // View mode: show title and status as text
            <div>
              <strong>{task.title}</strong>
              <span style={{ marginLeft: '1rem' }}>({task.status})</span>
              <button
                onClick={() => handleEdit(task.id, task.title, task.status)}
                style={{ marginLeft: '1rem' }}
              >
                Edit
              </button>
            </div>
          )}
          <button onClick={() => onDelete(task.id)} style={{ marginLeft: '1rem' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
