const mongoose = require('mongoose');
const config = require('./mongodb-config.json');



let URI = `mongodb+srv://${config.dbuser}:${encodeURIComponent(config.dbpsw)}@${config.dbcluster}-syezl.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
console.log(URI);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Not connected to database", err);
});

module.exports = mongoose;