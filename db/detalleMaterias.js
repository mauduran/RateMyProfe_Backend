const mongoose = require('./mongodb-connect')

let detalleMateriaSchema = mongoose.Schema({
    profesor: {
        type: String,
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    experienciaGeneral: {   // Se quitó el espacio 
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    dificultad: {
        type: Number, 
        min: 0,
        max: 5,
        required: true
    },
    preparación: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    cargaTrabajo: {  //Se quitó el espacio
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    flexibilidad: {
        type: String,
        min: 0,
        max: 5,
        required: true
    },
    ritmo: {
        type: Number,
        min: 0,
        max: 5,
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
detalleMateriaSchema.statics.addDetalleMateria = function(detalleMateria) {
    let newDetalleMateria = DetalleMateria(detalleMateria);
    return newDetalleMateria.save();
}*/

let DetalleMateria = mongoose.model('detalleMaterias', detalleMateriaSchema);

module.exports = DetalleMateria;