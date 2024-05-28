const {Schema, model} = require('mongoose');

const CarSchema = new Schema({
    car_name:{type:String, required:true},
    description:{type:String, required:true},
    photo:{type: Buffer},
    rental_price_per_hour: { type: Number, required: true },
    is_rented: { type: Boolean, default: false },
    rented_by: { type: Schema.Types.ObjectId, ref: 'User', default: null }
})

module.exports = model('Car',CarSchema);