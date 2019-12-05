const express = require('express');
const router = express.Router();
const User = require('../db/users');

router.route('/')
    .get((req, res) => {
        if(!req.esAdmin){

            res.statusCode = 401;
            res.end();
            return;
        }
        
        User.find({}, (err, docs) => {
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
        if(!req.esAdmin){

            res.statusCode = 401;
            res.end();
            return;
        }
        

        let newUser = req.body;

        // Validar si vienen las propiedades
        if (!newUser.nombre || !newUser.apellido || !newUser.password || !newUser.expediente || !newUser.carrera || !newUser.email) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: Nombre, Apellido, Password, Expediente, Carrera y Correo ');
        } else {
            // Validar si existe un usuario con el mismo correo o nombres y apellidos
            let sameEmailUser = await User.find({
                email: newUser.email
            });
            let sameNameUser = await User.find({
                nombre: newUser.nombre,
                apellido: newUser.apellido
            });

            if (sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            } else if (sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            } else {
                newUser.rol = "Estudiante";
                newUser.numReviews = 0;
                let max = 0;

                let user = await User.findOne().sort({
                    id: -1
                });

                if (user != null) {
                    max = user.id;
                }


                newUser.id = max + 1;

                let userDocument = User(newUser);
                userDocument.save()
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
    User.findOne({id: req.params.id}, (err, doc) => {
        if (err) {
            res.statusCode = 500;
            res.end();
        } else {
            res.statusCode = 200;
            res.send(doc);
        }
    });
}).delete(async (req,res)=>{
    if(!req.esAdmin){

        res.statusCode = 401;
        res.end();
        return;
    }
    
    
    let usr = await User.findOneAndDelete({id: req.params.id});

    if(user){
        req.statusCode = 200;
        res.send(usr);
    } else{
        req.statusCode = 500;
        res.send("Id no válido");
    }


});

module.exports = router;