import React, { useContext } from 'react';
import { Bell, Menu } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';

const Topbar = () => {
  const { currentUser, users, setCurrentUser } = useContext(TaskContext);

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button style={{ color: 'var(--text-light)' }}><Menu size={24} /></button>
        <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>TaskFlow</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Bell size={20} style={{ color: 'var(--text-light)' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '36px', height: '36px', borderRadius: '50%', 
            backgroundColor: 'var(--primary-color)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {currentUser ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{currentUser ? currentUser.name : 'No User'}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{currentUser ? currentUser.role : 'Select user below'}</span>
          </div>
          
          <select 
            style={{ marginLeft: '1rem', padding: '0.2rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            value={currentUser ? currentUser._id : ''}
            onChange={(e) => {
              const user = users.find(u => u._id === e.target.value);
              setCurrentUser(user);
            }}
          >
            <option value="" disabled>Select User to Simulate Auth</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
