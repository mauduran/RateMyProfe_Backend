const express = require('express');
const router = express.Router();
const Request = require('../db/Requests');

router.route('/')
    .get((req, res) => {
        // if(!req.esAdmin){

        //     res.statusCode = 401;
        //     res.end();
        //     return;
        // }
        
        Request.find({}, (err, docs) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.statusCode = 200;
                res.send(docs);
            }
        });

    })
    .post(async function (req, res) {

        let newReq = req.body;

        if (!newReq.nombre || !newReq.apellido || !newReq.rol || !newReq.numReviews || !newReq.password || !newReq.expediente || !newReq.carrera || !newReq.email) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: Nombre, Apellido, Password, Expediente, Carrera y Correo ');
        } else {
            // Validar si existe un usuario con el mismo correo o nombres y apellidos
            let sameEmailUser = await Request.find({
                email: newReq.email
            });
            let sameNameUser = await Request.find({
                nombre: newReq.nombre,
                apellido: newReq.apellido
            });

            if (sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            } else if (sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            } else {
                newReq.rol = "Estudiante";
                newReq.numReviews = 0;
                let max = 0;

                let user = await Request.findOne().sort({
                    id: -1
                });

                if (user != null) {
                    max = user.id;
                }


                newReq.id = max + 1;

                let reqDocument = Request(newReq);
                reqDocument.save()
                    .then(user => {
                        res.statusCode = 201;
                        res.send(user);
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
    Request.findOne({id: req.params.id}, (err, doc) => {
        if (err) {
            res.statusCode = 500;
            res.end();
        } else {
            res.statusCode = 200;
            res.send(doc);
        }
    });
}).delete(async (req,res)=>{
    // if(!req.esAdmin){

    //     res.statusCode = 401;
    //     res.end();
    //     return;
    // }
    
    
    let usr = await Request.findOneAndDelete({id: req.params.id});

    if(usr){
        req.statusCode = 200;
        res.send(usr);
    } else{
        req.statusCode = 500;
        res.send("Id no válido");
    }


});

module.exports = router;