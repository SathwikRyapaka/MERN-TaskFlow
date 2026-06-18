import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statuses = ['Backlog', 'To Do', 'In Progress', 'Testing', 'Done'];

const Dashboard = () => {
  const { tasks, updateTaskStatus } = useContext(TaskContext);
  const navigate = useNavigate();
  
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTaskId) {
      updateTaskStatus(draggedTaskId, newStatus);
      setDraggedTaskId(null);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Project Dashboard</h2>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => navigate('/tasks')}>
          <Plus size={18} />
          Create Task
        </button>
      </div>

      <div className="kanban-board">
        {statuses.map(status => {
          const columnTasks = tasks.filter(t => t.status === status);
          
          let statusColor = '';
          if(status === 'Backlog') statusColor = 'var(--status-backlog-color)';
          if(status === 'To Do') statusColor = 'var(--status-todo-color)';
          if(status === 'In Progress') statusColor = 'var(--status-inprogress-color)';
          if(status === 'Testing') statusColor = 'var(--status-testing-color)';
          if(status === 'Done') statusColor = 'var(--status-done-color)';

          return (
            <div 
              key={status} 
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="kanban-column-header">
                <div className="status-dot" style={{ backgroundColor: statusColor }}></div>
                <span>{status}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--text-light)', fontSize: '0.9rem' }}>{columnTasks.length}</span>
              </div>
              
              <div className="kanban-tasks">
                {columnTasks.map(task => (
                  <div 
                    key={task._id} 
                    className="task-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task._id)}
                  >
                    <div className="task-card-title">{task.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                      {task.assignee && (
                         <div title={task.assignee.name} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            {task.assignee.name.charAt(0)}
                         </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <button 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', padding: '0.5rem', borderRadius: '4px', textAlign: 'left', fontWeight: '500' }}
                  onClick={() => navigate('/tasks', { state: { initialStatus: status } })}
                >
                  <Plus size={16} />
                  Add Task
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
