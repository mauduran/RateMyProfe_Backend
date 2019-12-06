const express = require('express');
const router = express.Router();
const Sugerencias = require('../db/Sugerencias');

router.route('/')
    .get((req, res) => {
        if(!req.esCordi){

            res.statusCode = 401;
            res.end();
            return;
        }

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

    /*
    expedienteEstudiante: {
        type: String,
        required: true
    },
    profesor: {
        type: String,
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    Reseña: {  
        type: String,
        required: true
    },
    idReseña: {
        type: Number, 
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    rol: {  //Se quitó el espacio
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
},  {
    */
    .post(async function (req, res) {
        if(!req.esCordi){
                res.statusCode = 401;
                res.end();
                return;
        }

        let newSugerencia = req.body;
        if(!newSugerencia.expedienteEstudiante || !newSugerencia.profesor || !newSugerencia.materia ||
           !newSugerencia.Reseña || !newSugerencia.idReseña || !newSugerencia.descripcion || !newSugerencia.rol){
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: expedienteEstudiante, profesor, materia, Reseña, idReseña, descripcion y rol'); 
           }else{
                // Validar si existe un usuario con el mismo correo o nombres y apellidos
                let max = 0;

                let sugr = await Sugerencias.findOne().sort({
                    id: -1
                });

                if (sugr != null) {
                    max = sugr.id;
                }


                newSugerencia.id = max + 1;
                let sugrDocument = Sugerencias(newSugerencia);
                sugrDocument.save()
                    .then(sugr => {
                        res.statusCode = 201;
                        res.send(sugr);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });
           }

    })
    ;

router.route('/:id')
    .delete(async (req,res)=>{
        if(!req.esAdmin){
    
            res.statusCode = 401;
            res.end();
            return;
        }
        
        
        let sugr = await Sugerencias.findOneAndDelete({id: req.params.id});
    
        if(sugr){
            req.statusCode = 200;
            res.send(sugr);
        } else{
            req.statusCode = 500;
            res.send("Id no válido");
        }
    
    
    });

    module.exports = router;
    
    