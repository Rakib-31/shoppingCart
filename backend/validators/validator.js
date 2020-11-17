const validator = require('validator');

let validate = (product) => {
    let error = {};

    // if(!product.image){
    //     error.image = 'Image is required';
    // }

    if(!product.product_name){
        error.name = ' Product name is required';
    }

    if(!product.product_price) {
        error.price = 'Product price is required';
    }
    if(!product.shipping_charge){
        error.charge = 'Shipping charge is required';
    }
    if(!product.color){
        error.color = 'Color is required';
    }
    if(!product.size){
        error.size = 'Size is required';
    }    

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate;