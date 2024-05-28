const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email:{type:String, unique:true, required:true},
    password:{type:String,  required:true},
    isActivated:{type:Boolean, default:false},
    role:{type:Number, default:0},
    activationLink:{type:String}
})

module.exports = model('User',UserSchema);