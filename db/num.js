const mongoose = require('./mongodb-connect')

let numSchema = mongoose.Schema({
    num: {
        type: String,
        required: true
    }},
    {
        versionKey: false // You should be aware of the outcome after set to false
    }
);

numSchema.statics.addNum = function(user) {
    console.log(user);
    let newNum = Num(user);
    return newNum.save();
}

let Num = mongoose.model('num', numSchema);

module.exports = Num;