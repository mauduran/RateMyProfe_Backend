const express = require('express');
const port = 3000;
const app = express();
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const User = require('./db/users')
const Token = require('./db/token')
// const mongo = require('./db/mongodb-connect');

app.use(express.json());

app.use('/api/users', authMiddleware);
app.use('/api/users', authUsr);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);



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