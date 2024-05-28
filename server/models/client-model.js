const {Schema, model} = require('mongoose');

const ClientSchema = new Schema({
   user:{type:Schema.Types.ObjectId,ref:'User'},
    surname:{type:String},
    name:{type:String},
    patronymic:{type:String},
    passport_number :{type:String},
    driver_license:{type:String},
})

module.exports = model('Client',ClientSchema);
