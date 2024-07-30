import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State to hold the value of the new task input
  const [newTask, setNewTask] = useState('');

  // useEffect hook to load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // useEffect hook to save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task to the list
  const addTask = () => {
    if (newTask.trim()) {
      // Get the current date
      const date = new Date().toLocaleDateString();
      // Create a new task object and update the tasks state
      setTasks([...tasks, { text: newTask, completed: false, date }]);
      setNewTask(''); // Clear the input field
    }
  };

  // Function to delete a task from the list
  const deleteTask = (index) => {
    // Filter out the task to be deleted and update the tasks state
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (index) => {
    // Map through the tasks and toggle the completed status of the specified task
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      
      {/* Input field to add a new task */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      
      {/* Button to add the new task */}
      <button onClick={addTask}>Add</button>
      
      {/* List of tasks */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {/* Clicking on the task text toggles its completion status */}
            <span onClick={() => toggleTaskCompletion(index)}>
              {task.text}
            </span>
            {/* Display the date the task was added */}
            <span className="date">{task.date}</span>
            {/* Button to delete the task */}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
