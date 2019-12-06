const express = require('express');
const router = express.Router();
const Detalle = require('../db/detalleMaterias');


router.route('/')

.get((req, res) => {
    if(req.query.profesor && req.query.materia){
        Detalle.find({profesor:req.query.profesor , materia: req.query.materia} , (err, docs) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.statusCode = 200;
                res.send(docs);
                return;
            }
        });
    } else if(req.query.profesor ){
        Detalle.find({profesor:req.query.profesor} , (err, docs) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.statusCode = 200;
                res.send(docs);
                return;
            }
        });
    } else if(req.query.materia ){
        Detalle.find({materia: req.query.materia} , (err, docs) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.statusCode = 200;
                res.send(docs);
                return;
            }
        });
    }else{
        Detalle.find({}, (err, docs) => {
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
    if(!req.esAdmin){
        res.statusCode = 401;
        res.end();
        return;
    }

    let newDetalle= req.body;
    // Validar si vienen las propiedades
    if (!newDetalle.profesor || !newDetalle.materia ) {
        res.statusCode = 400;
        res.send('Las propiedades requeridas son: Profesor y Materia');
    } else {
        // Validar si existe el departamento
        let sameDetalle = await Detalle.find({
            profesor: newDetalle.profesor, materia: newDetalle.materia
        });

        if (sameDetalle.length > 0) {
            res.statusCode = 400;
            res.send('Ya existe un detalle con los mismos datos');
        }else {

            let max = 0;
            let detalle = await Detalle.findOne().sort({  id: -1 });

            if (detalle != null) {
                max = detalle.id;
            }


            newDetalle.experienciaGeneral = 0;
            newDetalle.dificultad = 0;
            newDetalle.preparación = 0;
            newDetalle.cargaTrabajo = 0;
            newDetalle.flexibilidad = 0;
            newDetalle.ritmo = 0;
            newDetalle.numReviews = 0;

            newDetalle.id = max + 1;

            let detalleDocument = Detalle(newDetalle);
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
    Detalle.findOne({id: req.params.id}, (err, doc) => {
        if (err) {
            res.statusCode = 500;
            res.end();
        } else {
            res.statusCode = 200;
            res.send(doc);
        }
    });
});

module.exports = router;
