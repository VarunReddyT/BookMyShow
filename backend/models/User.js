const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'customer', 'superAdmin'] },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    orderId : { type: Array, required: true },

});
module.exports = mongoose.model('User', userSchema);