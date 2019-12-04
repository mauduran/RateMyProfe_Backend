const express = require('express');
const randomize = require('randomatic');
const port = 3000;
const app = express();
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const User = require('./db/users')
const Token = require('./db/token')
// const mongo = require('./db/mongodb-connect');

app.use(express.json());

app.post('*', (req, res, next) => {
    console.log('POST happen')
    next();
  })


app.use('/api/users', authMiddleware);
app.use('/api/users', authUsr);


app.use('/api/users', usersRouter);







app.post('/api/login', function (req, res) {
    // Programar aquí lógica de token
    User.find({email: req.body.email, password: req.body.password})
        .then(async users => {
            if(users.length > 0) {
                let user = users[0];
                let tokenString = randomize('Aa0','10')+'-'+user.id;

                await Token.findOneAndDelete({userId: user.id});
                let tokenDoc = Token({userId: parseInt(user.id), token: tokenString});
                await tokenDoc.save();

                res.statusCode = 200;
                res.send({token: tokenString});
            }
            else {
                res.statusCode = 400;
                res.end();
            }
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
    
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

async function authMiddleware(req, res, next) {
    if(!req.headers['x-auth-user']) {
        res.statusCode = 401;
        res.end();
    }
    else {
        // Validar que el token sea válido
        let tokenString = req.headers['x-auth-user'];
        let token = await Token.findOne({token: tokenString});
        if(token) {
            req.userId = token.userId;
            let user = await User.findOne({id:token.userId});
            req.user = user;
            next();
        }
        else {
            res.statusCode = 401;
            res.end();
        }        
    }
}


async function authUsr(req, res, next) {
    if(!req.user) {
        res.statusCode = 401;
        res.end();
    }
    else {
        // Validar que el token sea válido
        if(req.user.rol=="Admin"){
            req.esAdmin = true;
            next();
        }
        else {
            res.statusCode = 401;
            res.end();
        }        
    }
}