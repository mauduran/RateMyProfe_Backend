const mongoose = require('./mongodb-connect')

let profeSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    departamento: {
        type: String,
        required: true
    },
    añosExp: {
        type: Number,
        required: true
    },
    materias: {
        type: String,
        required: false
    },
    id: {
        type: Number,
        required: true
    }
},  {
    versionKey: false // You should be aware of the outcome after set to false
});

userSchema.statics.addProfe = function(profe) {
    let newProfe = Profe(profe);
    return newProfe.save();
}

let Profe = mongoose.model('profes', profeSchema);

module.exports = Profe;