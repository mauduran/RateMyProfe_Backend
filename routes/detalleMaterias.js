const express = require('express');
const router = express.Router();
const DetalleMateria = require('../db/detalleMaterias');

router.route('/')

.post(async function (req, res) {
    /*console.log(req.esAdmin);
    if(!req.esAdmin){
        res.statusCode = 401;
        res.end();
        return;
    }*/

    let newDetalleMateria = req.body;
    // Validar si vienen las propiedades
    if (!newDetalleMateria.profesor || !newDetalleMateria.materia || !newDetalleMateria.experienciaGeneral || !newDetalleMateria.dificultad || !newDetalleMateria.numReviews 
        || !newDetalleMateria.preparación || !newDetalleMateria.cargaTrabajo || !newDetalleMateria.flexibilidad || !newDetalleMateria.ritmo ) {
        res.statusCode = 400;
        res.send('Las propiedades requeridas son: Porfesor, MAteria, ExperienciaGeneral, dificultad, numReviews, preparación, carga de trabajo, flexibilidad y r.');
    } else {
            let max = 0;
            let detalleMateria = await DetalleMateria.findOne().sort({  id: -1 });

            if (materia != null) {
                max = detalleMateria.id;
            }

            newMateria.id = max + 1;

            let materiaDocument = DetalleMateria(newMateria);
            detalleMateriaDocument.save()
                .then(detalleMateria => {
                    res.statusCode = 201;
                    res.send(detalleMateria);
                })
                .catch(reason => {
                    res.statusCode = 500;
                    res.end();
                });  
    }
});
router.route('/:id')
/*
.get(async (req, res) => {
    let materia = await Materia.findOne({id: req.params.id});
    if(materia){
        req.statusCode = 200;
        res.send(materia);
    } else{
        req.statusCode = 500;
        res.send("Id no válido");
    }
})*/

module.exports = router;


