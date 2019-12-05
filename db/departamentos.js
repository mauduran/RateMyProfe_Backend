const mongoose = require('./mongodb-connect')

let departamentoSchema = mongoose.Schema({
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
departamentoSchema.statics.addDepartamento = function(departamento) {
    let newDepartamento = User(departamento);
    return newDepartamento.save();
}*/

let Departamento = mongoose.model('users', departamentoSchema);

module.exports = Departamento;