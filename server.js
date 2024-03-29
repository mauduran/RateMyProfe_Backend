const express = require('express');
const port = process.env.PORT || 3001;
const cors = require('cors');
const app = express();
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const profesRouter = require('./routes/profes');
const materiasRouter = require('./routes/materias');
const carreraRouter = require('./routes/carreras');
const departamentoRouter = require('./routes/departamentos');
const sugerenciasRouter = require('./routes/sugerencias');
const detalleMateriasRouter = require('./routes/detalleMaterias');
const reviewRouter = require('./routes/Reviews');
const requestRouter = require('./routes/Requests');

const User = require('./db/users')
const Token = require('./db/token')


// let corsConfig = {
//     origin: "*"
// }
app.use(cors());



app.use(express.json());

app.use('/api/users', authMiddleware);
app.use('/api/users', authAdminOps);


app.use('/api/profes', authMiddleware);
app.use('/api/profes', authAdminOps);


app.use('/api/materias', authMiddleware);
app.use('/api/materias', authAdminOps);

app.use('/api/sugerencias', authMiddleware);
app.use('/api/sugerencias', authAdminOps);

app.use('/api/detalleMaterias', authMiddleware);
app.use('/api/detalleMaterias', authAdminOps);


app.use('/api/reviews', authMiddleware);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/detalleMaterias', detalleMateriasRouter);
app.use('/api/profes', profesRouter);
app.use('/api/materias', materiasRouter);
app.use('/api/carreras', carreraRouter);
app.use('/api/departamentos', departamentoRouter);
app.use('/api/sugerencias', sugerenciasRouter);
app.use('/api/detalleMaterias', detalleMateriasRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/requests', requestRouter);


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
    else{
        if(req.method=='GET' && req.user==undefined){
            next();
            return;
        }
        // Validar que el token sea válido
        if(req.user.rol=="Coordinador"){
            req.esCordi = true;
            next();
        } 
        else if(req.user.rol=="Admin"){
            req.esAdmin = true;
            next();
        }
        else {
            req.esAdmin = false;
            req.esCordi = false;
            next();
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