const mongoose = require('./mongodb-connect')

let tokenSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

let Token = mongoose.model('token', tokenSchema);

module.exports = Token;