const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promoCodeSchema = new Schema({
    promo_code: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true,
    },
    discount_rate: {
        type: String,
        required: false,
        default: 0
    },
    use_time: {
        type: Number,
        required: true,
        default: 0
    },
    usages: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
    // active_status: {
    //     type: Boolean,
    //     default: false
    // }
});

const PromoCodeModel = mongoose.model('PromoCodeModel', promoCodeSchema);
module.exports = PromoCodeModel;