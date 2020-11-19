const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCartSchema = new Schema({
    image: {
        type: String
    },
    product_name: {
        type: String,
    },
    discount_rate:{
        type: Number,
    },
    size:{
        type: String
    },
    color:{
        type: String
    },
    shipping_method:{
        type: String,
        default: 'EMS'
    },
    quantity:{
        type: Number,
        default: 1
    },
    product_price:{
        type: Number,
        default: 0
    },
    shipping_charge:{
        type: Number,
        default: 0
    }
});

const userCart = mongoose.model('userCart', userCartSchema);
module.exports = userCart;