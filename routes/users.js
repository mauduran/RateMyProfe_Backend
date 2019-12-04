const express = require('express');
const router = express.Router();
const User = require('../db/users');

router.route('/')
    .get((req, res) => {
        User.find({}, (err, docs) => {
            if(err) {
                res.statusCode = 500;
                res.end();
            }
            else {
                res.statusCode = 200;
                res.send(docs);
            }
        });
    })
    .post(async function (req, res) {
        let newUser = req.body;

        // Validar si vienen las propiedades
        if(!newUser.nombre || !newUser.apellido || !newUser.password || !newUser.expediente || !newUser.carrera || !newUser.email) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: Nombre, Apellido, Password, Expediente, Carrera y Correo ');
        }
        else {
            // Validar si existe un usuario con el mismo correo o nombres y apellidos
            let sameEmailUser = await User.find({email: newUser.email});
            let sameNameUser = await User.find({nombre: newUser.nombre, apellido: newUser.apellido});

            if(sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            }
            else if(sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            }
            else {
                newUser.rol = "Estudiante";
                newUser.numReviews = 0;
                let max = 0;

                let users = [];
                
                User.find({}, (err, docs) => {
                    if(err) {
                        console.log("Errors")
                    }
                    else {
                        users = docs;
                    }
                });

                console.log(users);

                if(users.length>0){
                    User.findOne({}).sort(id, -1).run( function(err, doc) {
                        if(err){
                            console.log(err);
                        } else{
                            console.log(doc);
                        }
                     });
                }

            newUser.id = max+1;

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

module.exports = router;