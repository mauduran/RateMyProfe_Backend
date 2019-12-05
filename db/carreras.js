const mongoose = require('./mongodb-connect')

let carreraSchema = mongoose.Schema({
    nombre: {
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
carreraSchema.statics.addCarrera = function(carrera) {
    let newCarrera = Carrera(carrera);
    return newCarrera.save();
}*/

let Carrera = mongoose.model('carreras', carreraSchema);

module.exports = Carrera;