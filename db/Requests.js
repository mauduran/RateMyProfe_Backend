const mongoose = require('./mongodb-connect')

let requestSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    numReviews: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    expediente: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
},  {
    versionKey: false // You should be aware of the outcome after set to false
});
/*
requestSchema.statics.addUser = function(request) {
    let newRequest = User(request);
    return newRequest.save();
}*/

let Request = mongoose.model('requests', requestSchema);

module.exports = Request;