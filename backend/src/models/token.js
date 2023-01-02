const mongoose = require('mongoose');

const Token = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null, 
        ref: 'User'
    },
    token: {
        type: String,
        required: true,
    },
    expiredAt: {
        type: Date,
        default: Date.now,
        index: { expireAfterSeconds: 30 }
    }
})

module.exports = mongoose.model('token', Token);