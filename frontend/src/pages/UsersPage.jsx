import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const UsersPage = () => {
  const { users, addUser, deleteUser } = useContext(TaskContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Developer' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData({ name: '', email: '', role: 'Developer' });
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>User Management</h2>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowForm(!showForm)}>
          <Plus size={18} />
          Add User
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--border-radius)', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add New User</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label>Name</label>
              <input type="text" className="input-field" style={{ marginBottom: 0 }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div style={{ flex: 1 }}>
              <label>Email</label>
              <input type="email" className="input-field" style={{ marginBottom: 0 }} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div style={{ flex: 1 }}>
              <label>Role</label>
              <select className="input-field" style={{ marginBottom: 0 }} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
                <option value="Designer">Designer</option>
              </select>
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.5rem' }}>Save User</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={{ fontWeight: '500' }}>{user.name}</td>
                <td style={{ color: 'var(--text-light)' }}>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ color: 'var(--primary-color)' }}><Edit2 size={16} /></button>
                    <button style={{ color: 'var(--danger)' }} onClick={() => deleteUser(user._id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
               <tr>
                   <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>No users found. Add one to get started.</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
