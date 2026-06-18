const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignee', 'name email role');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'Backlog',
        priority: req.body.priority || 'Medium',
        assignee: req.body.assignee || null,
        history: [{
            status: req.body.status || 'Backlog',
            updatedBy: req.body.updatedBy // The user making the change
        }]
    });

    try {
        const newTask = await task.save();
        const populatedTask = await Task.findById(newTask._id).populate('assignee', 'name email role');
        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const previousStatus = task.status;
        const newStatus = req.body.status || task.status;

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        if (req.body.assignee !== undefined) {
             task.assignee = req.body.assignee;
        }

        if (previousStatus !== newStatus) {
            task.status = newStatus;
            task.history.push({
                status: newStatus,
                updatedBy: req.body.updatedBy
            });
        }

        const updatedTask = await task.save();
        const populatedTask = await Task.findById(updatedTask._id).populate('assignee', 'name email role');
        res.json(populatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
