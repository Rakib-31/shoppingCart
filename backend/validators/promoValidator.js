const validator = require('validator');

let promoValidate = (promo) => {
    let error = {};

    // if(!product.image){
    //     error.image = 'Image is required';
    // }

    if(!promo.promo_code){
        error.promo_code = ' Promo code is required';
    }

    if(!promo.start_date) {
        error.start_date = 'Start date is required';
    }

    if(!promo.use_time){
        error.use_time = 'Use time is required';
    }    

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = promoValidate;