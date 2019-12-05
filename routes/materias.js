const express = require('express');
const router = express.Router();
const Materia = require('../db/materias');

router.route('/')

.get((req, res) => {
    if(req.query.nombre_like && req.query.departamento){
        Materia.find({nombre: { $regex: req.query.nombre_like, $options: "i" }, departamento: req.query.departamento} , (err, docs) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.statusCode = 200;
                res.send(docs);
                return;
            }
        });
    } else if(req.query.nombre_like ){
        Materia.find({nombre: { $regex: req.query.nombre_like, $options: "i" }} , (err, docs) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.statusCode = 200;
                res.send(docs);
                return;
            }
        });
    } else if(req.query.departamento ){
        Materia.find({departamento: req.query.departamento} , (err, docs) => {
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
        Materia.find({}, (err, docs) => {
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

  /*  if(!req.esAdmin){

        res.statusCode = 401;
        res.end();
        return;
    }*/

    let newMateria = req.body;
    // Validar si vienen las propiedades
    if (!newMateria.nombre || !newMateria.descripción || !newMateria.creditos || !newMateria.departamento ) {
        res.statusCode = 400;
        res.send('Las propiedades requeridas son: Nombre, Descripción, Creditos y Departamento.');
    } else {
        // Validar si existe el departamento
        let sameMateria = await Materia.find({
            nombre: newMateria.nombre
        });

        if (sameMateria.length > 0) {
            res.statusCode = 400;
            res.send('Ya existe una matería con el mismo nombre');
        }else {

            let max = 0;
            let materia = await Materia.findOne().sort({  id: -1 });

            if (materia != null) {
                max = materia.id;
            }

            newMateria.id = max + 1;

            let materiaDocument = Materia(newMateria);
            materiaDocument.save()
                .then(materia => {
                    res.statusCode = 201;
                    res.send(materia);
                })
                .catch(reason => {
                    res.statusCode = 500;
                    res.end();
                });
        }
    }
});
router.route('/:id')
.get(async (req, res) => {
    let materia = await Materia.findOne({id: req.params.id});
    if(materia){
        req.statusCode = 200;
        res.send(materia);
    } else{
        req.statusCode = 500;
        res.send("Id no válido");
    }
})
module.exports = router;
