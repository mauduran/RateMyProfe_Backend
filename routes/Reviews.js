const express = require('express');
const router = express.Router();
const Review = require('../db/Reviews.js');
const Detalle = require('../db/detalleMaterias');

router.route('/')

    .get((req, res) => {
        // GET Reviews?expedienteEstudiante=””&profesor””&Materia=””


        if(req.query.expedienteEstudiante && req.query.profesor && req.query.materia){

            Review.find({expedienteEstudiante:req.query.expedienteEstudiante,  profesor:req.query.profesor , materia: req.query.materia} , (err, docs) => {
                if (err) {
                    res.statusCode = 500;
                    res.end();
                } else {
                    res.statusCode = 200;
                    res.send(docs);
                    return;
                }
            });
        } else if(req.query.profesor && req.query.materia){

            Review.find({profesor:req.query.profesor , materia: req.query.materia} , (err, docs) => {
                if (err) {
                    res.statusCode = 500;
                    res.end();
                } else {
                    res.statusCode = 200;
                    res.send(docs);
                    return;
                }
            });
        } else{
            Review.find({}, (err, docs) => {
                if (err) {
                    res.statusCode = 500;
                    res.end();
                } else {
                    res.statusCode = 200;
                    res.send(docs);
                }
            });
        }



    })
     .post(async function (req, res) {
        if (!req.logged) {
            res.status = 401;
            res.end();
            return;
        }
        let newDetalle = req.body;
        // Validar si vienen las propiedades
        if (!newDetalle.expedienteEstudiante || !newDetalle.profesor || !newDetalle.materia || !newDetalle.experienciaGeneral || !newDetalle.dificultad ||
            !newDetalle.preparación || !newDetalle.cargaTrabajo || !newDetalle.flexibilidad || !newDetalle.ritmo ||
            !newDetalle.takeAgain || !newDetalle.Optativa || !newDetalle.Reseña) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: Profesor y Materia');
        } else {
            // Validar si existe el departamento
            let sameDetalle = await Review.find({
                profesor: newDetalle.profesor,
                materia: newDetalle.materia,
                expedienteEstudiante: newDetalle.expedienteEstudiante
            });

            if (sameDetalle.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un detalle con los mismos datos');
            } else {

                let max = 0;
                let detalle = await Review.findOne().sort({
                    id: -1
                });

                if (detalle != null) {
                    max = detalle.id;
                }


                newDetalle.id = max + 1;

                detail = await Detalle.findOne({
                    profesor: newDetalle.profesor,
                    materia: newDetalle.materia
                });

                console.log(detail.numReviews);
                detail.experienciaGeneral = ((detail.experienciaGeneral * detail.numReviews + newDetalle.experienciaGeneral) / (detail.numReviews + 1)).toFixed(1);
                detail.dificultad = ((detail.dificultad * detail.numReviews + newDetalle.dificultad) / (detail.numReviews + 1)).toFixed(1);
                detail.preparación = ((detail.preparación * detail.numReviews + newDetalle.preparación) / (detail.numReviews + 1)).toFixed(1);
                detail.cargaTrabajo = ((detail.cargaTrabajo * detail.numReviews + newDetalle.cargaTrabajo) / (detail.numReviews + 1)).toFixed(1);
                detail.flexibilidad = ((detail.flexibilidad * detail.numReviews + newDetalle.flexibilidad) / (detail.numReviews + 1)).toFixed(1);
                detail.ritmo = ((detail.ritmo * detail.numReviews + newDetalle.ritmo) / (detail.numReviews + 1)).toFixed(1);
                detail.numReviews += 1;

                await Detalle.findOneAndUpdate({
                    profesor: newDetalle.profesor,
                    materia: newDetalle.materia
                }, detail, {
                    new: true
                });

                let detalleDocument = Review(newDetalle);
                detalleDocument.save()
                    .then(detalle => {
                        res.statusCode = 201;
                        res.send(detalle);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });
            }
        }
    });


    router.route('/:id')
.get((req, res) => {
    Review.findOne({id: req.params.id}, (err, doc) => {
        if (err) {
            res.statusCode = 500;
            res.end();
        } else {
            res.statusCode = 200;
            res.send(doc);
        }
    });
})
.delete(async (req,res)=>{

    let usr = await Review.findOneAndDelete({id: req.params.id});

    if(user){
        req.statusCode = 200;
        res.send(usr);
    } else{
        req.statusCode = 500;
        res.send("Id no válido");
    }


});

module.exports = router;