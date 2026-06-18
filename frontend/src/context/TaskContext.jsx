import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Simulated logged in user
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, usersRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/users')
      ]);
      setTasks(tasksRes.data);
      setUsers(usersRes.data);
      if (usersRes.data.length > 0 && !currentUser) {
        setCurrentUser(usersRes.data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // Optimistic update
      setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
      
      const res = await api.put(`/tasks/${taskId}`, { 
        status: newStatus,
        updatedBy: currentUser ? currentUser._id : null
      });
      
      // Update with server response to ensure history is captured correctly
      setTasks(tasks.map(t => t._id === taskId ? res.data : t));
    } catch (error) {
      console.error("Error updating task:", error);
      fetchData(); // Revert on failure
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, {
        ...updatedData,
        updatedBy: currentUser ? currentUser._id : null
      });
      setTasks(tasks.map(t => t._id === taskId ? res.data : t));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
        await api.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
        console.error("Error deleting task:", error);
    }
  }

  const addUser = async (userData) => {
    try {
      const res = await api.post('/users', userData);
      setUsers([...users, res.data]);
      if (!currentUser) setCurrentUser(res.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (userId) => {
     try {
         await api.delete(`/users/${userId}`);
         setUsers(users.filter(u => u._id !== userId));
     } catch (error) {
         console.error("Error deleting user:", error);
     }
  }

  return (
    <TaskContext.Provider value={{
      tasks, users, currentUser, setCurrentUser, loading,
      addTask, updateTaskStatus, updateTask, deleteTask, addUser, deleteUser, fetchData
    }}>
      {children}
    </TaskContext.Provider>
  );
};
