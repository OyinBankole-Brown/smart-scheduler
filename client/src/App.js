import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App(){
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from server
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try{
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleGenerate = async () => {
    if(!taskTitle) return;
    setLoading(true);

    try{
      const res = await axios.post('http://localhost:5000/api/generate-task', 
        { 
          title: taskTitle 
        });
      setTasks([res.data, ...tasks]);
      setTaskTitle('');
    } catch (err){
      console.error("Error generating task:", err);
      alert("Failed to generate task breakdown. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Smart Scheduler</h1>
      
      <div className="input-section">
        <input 
          type="text" 
          placeholder="What do you need to do? (e.g. 'Study for Calculus')" 
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Thinking...' : 'Generate Plan'}
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <div className="steps-container">
              {task.aiBreakdown.map((step, index) => (
                <div key={index} className="step-item">
                  <input type="checkbox" />
                  <span>{step.step}</span>
                </div>
              ))}
            </div>
            <small className="date">{new Date(task.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;