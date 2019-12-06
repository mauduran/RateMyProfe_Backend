const express = require('express');
const router = express.Router();
const Sugerencias = require('../db/Sugerencias');

router.route('/')
    .get((req, res) => {
        Sugerencias.find({}, (err, docs) => {
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
        if(!req.esCordi){
                res.statusCode = 401;
                res.end();
                return;
        }

        

    })
    ;

module.exports = router;
