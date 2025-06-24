import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (!task.trim()) return;
    const newTask = { text: task.trim(), completed: false };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleToggle = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="app">
      <h2>📝 React Task Tracker</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>
      <ul>
        {tasks.map((t, idx) => (
          <li key={idx} className={t.completed ? 'completed' : ''}>
            <span onClick={() => handleToggle(idx)}>{t.text}</span>
            <button onClick={() => handleDelete(idx)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
