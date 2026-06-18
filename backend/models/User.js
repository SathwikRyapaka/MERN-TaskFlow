const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Manager', 'Developer', 'Tester', 'Designer'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
