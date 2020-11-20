const AddProductModel = require('../model/addProductModel');
const UserCartModel = require('../model/userCartModel');
const PromoCodeModel = require('../model/promoCodeModel');


module.exports = {

    // get all products from the AddProductModel
    getProducts(req,res){
        var imageData;
        console.log('req.query');
        console.log(req.query);
        AddProductModel.find(req.query)
        .exec(function(err, data) {
            if (err){
                console.log(err);
                return res.status(400).json(err);
            }
            res.status(200).json(data);
        }); 
    },
    

    //save item to the cart 
    postCartItem(req,res){
        let userCart = new UserCartModel(req.body);
            
            userCart.save()
            .then(cart => {
                res.status(200).json({message: 'Product saved on cart successfully'});
            })
            .catch(error => console.log(error));
    },


    //get item all from the cart
    getCartItem(req, res) {
        UserCartModel.find(req.query)
        .exec(function(err, data) {
            if (err){
                console.log(err);
                return res.status(400).json(err);
            }
        
            res.status(200).json(data);
            
        });
    },


    //delete single cart item
    deleteCartItem(req, res){
        UserCartModel.remove(req.query)
        .exec(function(err, dataa){
            if(err){
                return res.status(400).json(err);
            }
            //res.status(200).json(data);
            UserCartModel.find({})
            .exec(function(err, data) {
                if (err){
                    console.log(err);
                    return res.status(400).json(err);
                }
            
                res.status(200).json(data);
                
            });
        })
    },


    //update cart item
    updateCartItem(req, res){
        UserCartModel.findOneAndUpdate(req.query, req.body, { upsert: true }, function(err) {
            if (err){
                console.log(err);
                return res.status(400).send({
                    error: 'error'
                });
            }
            res.status(200).json({message: 'item updated'});
        });
    },

    getPromo(req,res){
        PromoCodeModel.find(req.query)
        .exec(function(err, data) {
            if (err){
                console.log(err);
                return res.status(400).json({message: false});
            }
            if(data.length > 0){
                console.log(data);
                let currentDate = new Date().toLocaleDateString();
                let endDate = new Date(data[0].end_date).toLocaleDateString();
                console.log(endDate);

                if(endDate >= currentDate && data[0].use_time > data[0].usages) res.status(200).json({
                    message: true,
                    discount: data[0].discount_rate
                });
                else res.status(500).json({message: false});
            }
            else res.json({message: false});
        }); 
    }
}