const express = require('express');
const router = express.Router();
const User = require('../db/users');
const Token = require('../db/token');
const randomize = require('randomatic');

router.route('/')
    .post(async (req, res) => {
        console.log(req.body);
        // Programar aquí lógica de token
        let users = await User.find({
            email: req.body.email,
            password: req.body.password
        });

        console.log(users);
        if (users!=[]) {
            if (users.length > 0) {
                let user = users[0];
                let tokenString = randomize('Aa0', '10') + '-' + user.id;

                await Token.findOneAndDelete({
                    userId: user.id
                });
                let tokenDoc = Token({
                    userId: parseInt(user.id),
                    token: tokenString
                });
                await tokenDoc.save();

                res.statusCode = 200;
                res.send({
                    token: tokenString,
                    expediente: user.expediente,
                    rol: user.rol
                });
            } else {
                res.statusCode = 400;
                res.end();
            }

        } else {
            res.statusCode = 500;
            res.end();
        }

    });


module.exports = router;