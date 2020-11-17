const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addProductSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true,
        default: 0
    },
    discount_rate: {
        type: String,
        required: false,
        default: 0
    },
    shipping_charge: {
        type: String,
        required: true,
        default: 0
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    }
    // active: {
    //     type: Boolean,
    //     default: false
    // }
});

const AddProductModel = mongoose.model('AddProductModel', addProductSchema);
module.exports = AddProductModel;