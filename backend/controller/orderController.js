const OrderConfirmModel = require('../model/orderModel');

module.exports = {

    //user requesting order and here execute it
    postOrder(req,res){
        console.log(req);
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
    },


    //getting all order
    getOrder(req,res){
        OrderConfirmModel.find(req.query)
        .exec(function(err, data) {
            if (err){
                console.log(err);
                return res.status(400).json(err);
            }
            res.status(200).json(data);
        }); 
    },



    updateOrder(req,res){
        console.log(req.query);
        OrderConfirmModel.findOneAndUpdate(req.query, req.body, { upsert: true }, function(err){
            if(err) {
                res.status(500).json(err);
            }
            else  res.status(200).json({message: 'order confirmed'});
        })
    }
}