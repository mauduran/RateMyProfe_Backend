const mongoose = require('./mongodb-connect')

let materiaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripción: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    departamento: {
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
materiaSchema.statics.addMateria = function(materia) {
    let newMateria = Materia(materia);
    return newMateria.save();
}*/

let Materia = mongoose.model('materias', materiaSchema);

module.exports = Materia;