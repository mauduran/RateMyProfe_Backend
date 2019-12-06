const express = require('express');
const router = express.Router();
const Departamentos = require('../db/departamentos');


router.route('/')
.get((req, res) => {
    Departamentos.find({}, (err, docs) => {
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
    /*
    nombre: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
    */
    let newDepartamento = req.body;
    // Validar si vienen las propiedades
    if (!newDepartamento.nombre) {
        res.statusCode = 400;
        res.send('Las propiedades requeridas son: Nombre de departamento');
    } else {
        // Validar si existe el departamento
        let sameDepartamento = await Departamentos.find({
            nombre: newDepartamento.nombre
        });

        if (sameDepartamento.length > 0) {
            res.statusCode = 400;
            res.send('Ya existe un departamento con el mismo nombre');
            return;
        }else {

            let max = 0;
            let materia = await Departamentos.findOne().sort({  id: -1 });

            if (materia != null) {
                max = materia.id;
            }

            newDepartamento.id = max + 1;

            let departamentosDocument = Departamentos(newCarrera);
            departamentosDocument.save()
                .then(depto => {
                    res.statusCode = 201;
                    res.send(depto);
                })
                .catch(reason => {
                    res.statusCode = 500;
                    res.end();
                });
        }
    }
});

module.exports = router;
