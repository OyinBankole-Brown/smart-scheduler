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
      const res = await axios.get('https://smart-scheduler-api-boee.onrender.com/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleGenerate = async () => {
    if(!taskTitle) return;
    setLoading(true);

    try{
      const res = await axios.post('https://smart-scheduler-api-boee.onrender.com/api/generate-task', 
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

  const handleDelete = async (id) => {
    setTasks(tasks.filter(task => task._id !== id));

    //delete from server
    try{
      await axios.delete(`https://smart-scheduler-api-boee.onrender.com/api/tasks/${id}`);
    } catch (err){
      console.error("Error deleting task:", err);
      alert("Failed to delete task. Please try again.");
      // Re-fetch tasks to ensure UI consistency
      fetchTasks();
    }
  }

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
            <div className="card-header">
              <h3>{task.title}</h3>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(task._id)}
                title="Delete Task"
              >
                ✕
              </button>
            </div>
            
            <div className="steps-container">
              {task.aiBreakdown.map((stepObj, index) => (
                <div key={index} className="step-item">
                  <input type="checkbox" />
                  <span>{stepObj.step || stepObj}</span>
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