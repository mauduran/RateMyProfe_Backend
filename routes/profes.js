const express = require('express');
const router = express.Router();
const Profe = require('../db/profes');

router.route('/')
    .get((req, res) => {
        if(req.query.nombre_like && req.query.departamento){
            Profe.find({nombre: { $regex: req.query.nombre_like, $options: "i" }, departamento: req.query.departamento} , (err, docs) => {
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
            Profe.find({nombre: { $regex: req.query.nombre_like, $options: "i" }} , (err, docs) => {
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
            Profe.find({departamento: req.query.departamento} , (err, docs) => {
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
            Profe.find({}, (err, docs) => {
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
        let newProfe = req.body;

        if(!req.esAdmin){

            res.statusCode = 401;
            res.end();
            return;
        }
        // Validar si vienen las propiedades
        if (!newProfe.nombre || !newProfe.departamento || !newProfe.añosExp) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: Nombre, Apellido, Password, Expediente, Carrera y Correo ');
        } else {

            if(!newProfe.materias){
                newProfe.materias =[];
            }
            let existsProfe = await Profe.findOne({nombre: newProfe.nombre});

            if(existsProfe){
                res.statusCode = 400;
                res.send("Ya existe un docente con ese nombre");
                return;
            } 

            let max = 0;
            
            let profe = await Profe.findOne().sort({
                id: -1
            });


            if (profe != null) {
                max = profe.id;
            }

            newProfe.id = max + 1;

            let profeDocument = Profe(newProfe);
            profeDocument.save()
                .then(profe => {
                    res.statusCode = 201;
                    res.send(profe);
                })
                .catch(reason => {
                    res.statusCode = 500;
                    res.end();
                });
        }  
    });



router.route('/:id')
.delete(async (req,res)=>{

    if(!req.esAdmin){
        res.statusCode = 401;
        res.end();
        return;
    }

    let profe = await Profe.findOneAndDelete({id: req.params.id});
    if(profe){
        req.statusCode = 200;
        res.send(profe);
    } else{
        req.statusCode = 500;
        res.send("Id no válido");
    }
})
.put(async (req,res)=>{


    if(!req.esAdmin){
        res.statusCode = 401;
        res.end();
        return;
    }

    
    let profe = {};

    if(req.body.nombre){
        profe.nombre = req.body.nombre;
    }

    if(req.body.departamento){
        profe.departamento = req.body.departamento;
    }


    if(req.body.añosExp){
        profe.añosExp = req.body.añosExp;
    }

    if(req.body.materias){
        profe.materias = req.body.materias;
    }
    
    await Profe.findOneAndUpdate({id: req.params.id}, profe, {
        new: true
      });

    if(profe){
        req.statusCode = 200;
        res.send(profe);
    } else{
        req.statusCode = 500;
        res.send("Id no válido");
    }
});



module.exports = router;