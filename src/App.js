import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5045/api/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const addTask = (task) => {
    axios.post("http://localhost:5045/api/tasks", task).then((res) => {
      setTasks([...tasks, res.data]);
    });
  };

  const updateTask = (id, title, status) => {
    axios
      .put(
        `http://localhost:5045/api/tasks/${id}`,
        { id, title, status },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      )
      .then((res) => {
        const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title, status } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };  

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5045/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onSave={addTask} />
      <TaskList tasks={tasks} onUpdateStatus={updateTask} onDelete={handleDelete} />
    </div>
  );
}

export default App;
