const OrderConfirmModel = require('../model/orderModel');

module.exports = {
    getOrder(req,res){

    },

    postOrder(req,res){
        console.log(req.body);
        let order = new OrderConfirmModel(req.body);
        order.save()
        .then(product => {
            res.status(200).json({
                message: 'Product created successfully',
                status: true
            });   
        })
        .catch(eror => console.log(error));
    },

    deleteOrder(req,res){
        console.log('dfdf');
    }
}