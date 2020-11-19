const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    item_price: {
        type: String,
        required: true
    },
    pending: {
        type: Boolean,
        default: true
    },
    confirm: {
        type: Boolean,
        default: false
    },
    cancel: {
        type: Boolean,
        default: false
    }
});

const OrderConfirmModel = mongoose.model('OrderConfirmModel', orderSchema);
module.exports = OrderConfirmModel;

