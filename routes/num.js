const express = require('express');
const router = express.Router();
const Num = require('../db/num');

router.route('/')
    .get((req, res) => {
        Num.find({}, (err, docs) => {
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
        let newNum = req.body;

        // Validar si vienen las propiedades
        if(!newNum.num) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: num');
        }
        else {
            // Validar si existe un usuario con el mismo correo o nombres y apellidos

                let numDocument = Num(newNum);
                numDocument.save()
                    .then(num => {
                        res.statusCode = 201;
                        res.send(num);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });       
            }
    });

module.exports = router;