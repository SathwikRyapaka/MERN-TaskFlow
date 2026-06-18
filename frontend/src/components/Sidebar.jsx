import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Users, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div style={{ padding: '2rem 1.5rem', fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dark)' }}>
        <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--primary-color)', borderRadius: '4px' }}></div>
        TaskFlow
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
        <NavLink 
          to="/dashboard" 
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
            borderRadius: 'var(--border-radius)',
            backgroundColor: isActive ? 'var(--bg-color)' : 'transparent',
            color: isActive ? 'var(--text-dark)' : 'var(--text-light)',
            fontWeight: isActive ? '600' : '500'
          })}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink 
          to="/tasks" 
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
            borderRadius: 'var(--border-radius)',
            backgroundColor: isActive ? 'var(--bg-color)' : 'transparent',
            color: isActive ? 'var(--text-dark)' : 'var(--text-light)',
            fontWeight: isActive ? '600' : '500'
          })}
        >
          <CheckSquare size={20} />
          Tasks
        </NavLink>

        <NavLink 
          to="/users" 
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
            borderRadius: 'var(--border-radius)',
            backgroundColor: isActive ? 'var(--bg-color)' : 'transparent',
            color: isActive ? 'var(--text-dark)' : 'var(--text-light)',
            fontWeight: isActive ? '600' : '500'
          })}
        >
          <Users size={20} />
          Users
        </NavLink>

        <NavLink 
          to="/reports" 
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
            borderRadius: 'var(--border-radius)',
            backgroundColor: isActive ? 'var(--bg-color)' : 'transparent',
            color: isActive ? 'var(--text-dark)' : 'var(--text-light)',
            fontWeight: isActive ? '600' : '500'
          })}
        >
          <BarChart2 size={20} />
          Reports
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
