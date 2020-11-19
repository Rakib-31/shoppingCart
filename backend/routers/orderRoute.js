const router = require('express').Router();
const {
    postOrder
} = require('../controller/orderController');

router.post('/post/user', postOrder);

module.exports = router;