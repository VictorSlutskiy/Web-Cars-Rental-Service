const {Schema, model} = require('mongoose');

const RentSchema = new Schema({
   user_id:{type:Schema.Types.ObjectId,default:false,ref:'User',required:true},
    product_id:{type:Schema.Types.ObjectId, default:false,ref:'Product',required:true},
    isConfirm: {type: Boolean, default: false},
    confirmationDate: { type: Date , default:Date.now},
    endDate: { type: Date,default:Date.now},
    price:{type:Number,default:0 },
    period:{type:Number, default:1},
    isEnd: {type: Boolean, default: false}
})

module.exports = model('Rent',RentSchema);