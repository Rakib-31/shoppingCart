const router = require('express').Router();
const {
    postOrder,
    getOrder,
    updateOrder
} = require('../controller/orderController');

router.post('/post/user', postOrder);
router.get('/getorder', getOrder);
router.post('/update', updateOrder);

module.exports = router;