const mongoose = require('./mongodb-connect')

let reviewSchema = mongoose.Schema({
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
    cargaTrabajo: { //Se quitó el espacio
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    flexibilidad: {
        type: Number,
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
    takeAgain: {
        type: String,
        required: true
    },
    Optativa: {
        type: String,
        required: true
    },
    Reseña: {
        type: String,
    },
    id: {
        type: Number,
        required: true
    }
},  {
    versionKey: false // You should be aware of the outcome after set to false
});

/*
reviewSchema.statics.addReview = function(review) {
    let newReview = Review(review);
    return newReview.save();
}*/

let Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;