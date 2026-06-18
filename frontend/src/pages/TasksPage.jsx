import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const TasksPage = () => {
  const { tasks, users, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: location.state?.initialStatus || 'Backlog',
    priority: 'Medium',
    assignee: ''
  });

  const [selectedTask, setSelectedTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      updateTask(selectedTask._id, formData);
      setSelectedTask(null);
    } else {
      addTask(formData);
    }
    setFormData({ title: '', description: '', status: 'Backlog', priority: 'Medium', assignee: '' });
    navigate('/dashboard');
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee ? task.assignee._id : ''
    });
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1, backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ marginBottom: '2rem' }}>{selectedTask ? 'Edit Task' : 'Create Task'}</h2>
        
        <form onSubmit={handleSubmit}>
          <label>Task Title</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. Implement Login API"
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required 
          />

          <label>Description</label>
          <textarea 
            className="input-field" 
            rows="4"
            placeholder="Detailed description of the task..."
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            required 
          />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Status</label>
              <select className="input-field" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Backlog">Backlog</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Testing">Testing</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Priority</label>
              <select className="input-field" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Assign To</label>
              <select className="input-field" value={formData.assignee} onChange={e => setFormData({...formData, assignee: e.target.value})}>
                <option value="">Unassigned</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn-primary">Save Task</button>
            {selectedTask && (
              <button type="button" className="btn-outline" onClick={() => {
                setSelectedTask(null);
                setFormData({ title: '', description: '', status: 'Backlog', priority: 'Medium', assignee: '' });
              }}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Task List</h3>
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          {tasks.map(task => (
            <div key={task._id} style={{ backgroundColor: 'var(--card-bg)', padding: '1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem' }}>{task.title}</strong>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ color: 'var(--primary-color)' }} onClick={() => handleEdit(task)}>Edit</button>
                    <button style={{ color: 'var(--danger)' }} onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>{task.status} • {task.priority}</p>
              
              <details style={{ marginTop: '1rem' }}>
                <summary style={{ fontSize: '0.9rem', cursor: 'pointer', color: 'var(--text-light)' }}>View History</summary>
                <div style={{ padding: '0.5rem 0', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                  {task.history && task.history.length > 0 ? (
                      task.history.map((h, i) => (
                        <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                          Changed to <strong>{h.status}</strong> on {format(new Date(h.timestamp), 'MMM d, yyyy HH:mm')}
                        </div>
                      ))
                  ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>No history available</span>
                  )}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
