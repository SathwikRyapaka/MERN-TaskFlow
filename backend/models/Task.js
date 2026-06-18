const mongoose = require('mongoose');

const taskHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Backlog', 'To Do', 'In Progress', 'Testing', 'Done'],
        default: 'Backlog'
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    history: [taskHistorySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
