const {
    getProducts,
    postCartItem,
    getCartItem,
    deleteCartItem,
    updateCartItem,
    getPromo
} = require('../controller/userController');

const router = require('express').Router();

router.get('/getuserproducts', getProducts);
router.post('/cart/postitem', postCartItem);
router.get('/cart/getcartitem', getCartItem);
router.delete('/cart/deletecartitem', deleteCartItem);
router.post('/cart/updatecartitem', updateCartItem);
router.get('/cart/getpromo', getPromo);

module.exports = router;