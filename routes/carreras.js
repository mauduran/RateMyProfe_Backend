const express = require('express');
const router = express.Router();
const Carrera = require('../db/carreras');


router.route('/')
.get((req, res) => {
    Carrera.find({}, (err, docs) => {
        if (err) {
            res.statusCode = 500;
            res.end();
        } else {
            res.statusCode = 200;
            res.send(docs);
        }
    })
})
.post(async function (req, res) {

    let newCarrera = req.body;
    // Validar si vienen las propiedades
    if (!newCarrera.nombre) {
        res.statusCode = 400;
        res.send('Las propiedades requeridas son: Nombre de carrera');
    } else {
        // Validar si existe el departamento
        let sameCarrera = await Carrera.find({
            nombre: newCarrera.nombre
        });

        if (sameCarrera.length > 0) {
            res.statusCode = 400;
            res.send('Ya existe una carrera con el mismo nombre');
            return;
        }else {

            let max = 0;
            let materia = await Carrera.findOne().sort({  id: -1 });

            if (materia != null) {
                max = materia.id;
            }

            newCarrera.id = max + 1;

            let carreraDocument = Carrera(newCarrera);
            carreraDocument.save()
                .then(carrera => {
                    res.statusCode = 201;
                    res.send(carrera);
                })
                .catch(reason => {
                    res.statusCode = 500;
                    res.end();
                });
        }
    }
});

module.exports = router;


router.route('/:id').delete(async (req, res)=>{
    let carrera = await Carrera.findOneAndDelete({id: req.params.id});
    if(carrera){
        req.statusCode = 200;
        res.send(carrera);
    } else{
        req.statusCode = 500;
        res.send("Id no válido");
    }
});