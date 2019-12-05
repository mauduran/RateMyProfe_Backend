const express = require('express');
const port = process.env.PORT || 3000;
// const cors = require('cors');
const app = express();
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const profesRouter = require('./routes/profes');
const materiasRouter = require('./routes/materias');
const User = require('./db/users')
const Token = require('./db/token')


// let corsConfig = {
//     origin: "https://ogonzale-project-front.herokuapp.com"
// }
// app.use(cors(corsConfig));



app.use(express.json());

app.use('/api/users', authMiddleware);
app.use('/api/users', authAdminOps);

app.use('/api/profes', authMiddleware);
app.use('/api/profes', authAdminOps);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/profes', profesRouter);
app.use('/api/materias', materiasRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

async function authMiddleware(req, res, next) {
    if(!req.headers['x-auth-user'] && req.method!='GET') {
    
        res.statusCode = 401;
        res.end();
    }
    else if(req.headers['x-auth-user']){
        // Validar que el token sea válido
        let tokenString = req.headers['x-auth-user'];
        let token = await Token.findOne({token: tokenString});
        if(token) {
            req.userId = token.userId;
            let user = await User.findOne({id:token.userId});
            req.user = user;
            req.logged = true;
            next();
        }
    }
        else {
            req.logged = false;
            next();
        }        
    
}


async function authAdminOps(req, res, next) {
    // console.log(req.logged);   
    if(!req.user && !req.logged && req.method!='GET') {
        res.statusCode = 401;
        res.end();
    }
    else if(req.method=='GET'){
        next()
    } else{
        // Validar que el token sea válido
        if(req.user.rol=="Admin"){
            req.esAdmin = true;
            next();
        }
        else {
            req.esAdmin = false;
            next()
        }        
    }
}

// async function authUsr(req, res, next) {
//     if(!req.user) {
//         res.statusCode = 401;
//         res.end();
//     }
//     else {
//         // Validar que el token sea válido
//         if(req.user.rol=="Admin"){
//             req.esAdmin = true;
//             next();
//         }
//         else {
//             res.statusCode = 401;
//             res.end();
//         }        
//     }
// }