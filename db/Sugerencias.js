const mongoose = require('./mongodb-connect')

let sugerienciaSchema = mongoose.Schema({
    expedienteEstudiante: {
        type: String,
        required: true
    },
    profesor: {
        type: String,
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    Reseña: {  
        type: String,
        required: true
    },
    idReseña: {
        type: Number, 
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    rol: {  //Se quitó el espacio
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
sugerienciaSchema.statics.addSugerencia = function(sugerencia) {
    let newSugerencia= Sugerencia(newSugerencia);
    return newSugerencia.save();
}*/

let Sugerencia = mongoose.model('Sugerencias', sugerienciaSchema);

module.exports = User;