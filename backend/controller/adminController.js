const AddProductModel = require('../model/addProductModel');
const Admin = require('../model/admin');
const validate = require('../validators/validator');
const promoValidate = require('../validators/promoValidator');
const sharp = require('sharp');
const PromoCodeModel = require('../model/promoCodeModel');
const testFunction = require('../js/product');
//const alert = require('alert');
//const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, '../uploads/');
//     },
//     filename: function(req,file,cb){
//         cb(null, new Date().toISOString()+file.originalname);
//     }
// });

// const upload = multer({storage: storage});

module.exports = {

    //login for admin panel
    login(req,res) {
        let {adminId, password} = req.body;
        Admin.findOne({adminId})
        .then(admin => {
            // console.log(admin.adminId);
            // console.log(admin.password);
            (password === admin.password) ? res.redirect('/panel') : res.status(500).json({
                message: 'Invalid password'
            });
        })
        .catch(error => console.log(error));
    },

    register(req,res) {
        console.log(req.body);
        let {adminId, password} = req.body;
        let admin = new Admin({
            adminId,
            password
        });
        admin.save()
        .then(admin => {
            return res.status(201).json({
                message: 'admin created successfully'
            });
        })
        .catch(error => console.log(error));
    },

    //render login.ejs file
    loginPage(req,res){
        res.render('login');
    },

     //render panel.ejs file
    panel(req,res){
        res.render('panel');
    },

     //render products,ejs file
    products(req,res){
        var imageData;

        console.log('something to be find');
        AddProductModel.find(req.query)
        .exec(function(err, data) {
            //console.log(data);
            if (err){
                console.log(err);
                return res.status(400).json(err);
            }
            //return res.status(200).json(data);;
            var imageData = data;
            imageData.forEach((element) => {
                console.log(element.image);
            });
        
            res.render('products', {item: imageData});
            
        });
        
        
        
    },

    //render addproducts.ejs file
    addproducts(req,res){
        res.render('addproducts');
    },

    //creating new products
    saveProduct(req,res,next) {
        //console.log(req.file);
        let { product_name, product_price, discount_rate, shipping_charge,color,size,active} = req.body;
        let {image} = req.file;
        console.log(image);    
        let checkError = validate({image, product_name, product_price, discount_rate, shipping_charge,color,size,active});
        if(checkError.isValid){
            // resize image using sharp
            sharp(req.file.path).resize({width: 500, height:500}).toFile('./uploads/images/'+req.file.originalname)
            .then(test => {
                req.file.path = 'uploads\\images\\' + req.file.originalname;
                let product = new AddProductModel({
                    image: req.file.path,
                    product_name,
                    product_price,
                    discount_rate,
                    shipping_charge,
                    color,
                    size,
                    active
                });
                console.log(product);
                product.save()
                .then(product => {
                    //res.status(500).json({message: 'Product created successfully'});
                    res.send(
                        '<div style="background-color: grey;text-align: center; margin-top: 10%; margin-left: 40%; color: red; z-index: 1; height: 200px; width: 200px; box-shadow: 5px 5px grey;"><h1>OK</h1></div>'
                    );
                })
                .catch(eror => console.log(error));
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            res.status(500).json(checkError.error);
        }
    },

    editProduct(req,res){
        AddProductModel.findOne({_id: req.params.productId})
        .exec(function(err, data) {
            //console.log(data);
            if (err){
                console.log(err);
                return res.status(400).json(err);
            }
            //return res.status(200).json(data);;
            //data.start_date = data.start_date.getDate();
        
            res.render('updateProduct', {productData: data});
            
        });
    },

    updateProduct(req,res){
        //console.log(req.body);
        let {product_name, product_price, discount_rate, color, size, shipping_charge} = req.body;
        AddProductModel.findOneAndUpdate(req.query, {product_name, product_price, discount_rate, color, size, shipping_charge}, { upsert: true }, function(err){
            if(err) {
                res.status(500).json(err);
            }
            else {
                
            //     res.status(200).json({
                
            //     message: 'Successfully updated'
            // });

             res.redirect('/getallproducts');
        }
        })
    },

    getPromoCode(req,res){

        console.log('something to be find');
        PromoCodeModel.find(req.query)
        .exec(function(err, data) {
            //console.log(data);
            if (err){
                console.log(err);
                return res.status(400).json(err);
            }
            //return res.status(200).json(data);;
            //data.start_date = data.start_date.getDate();
            var promoCodeData = data;
            promoCodeData.forEach((element) => {
                console.log(element.promo_code);
            });
        
            res.render('promocode', {promoItem: promoCodeData, imaging: testFunction});
            
        });
    },

    addNewPromo(req,res){
        res.render('newPromo');
    },

    savePromoCode(req,res,next) {
        console.log(req.body);
           
        let checkError = promoValidate({promo_code, start_date,end_date, discount_rate, use_time});
        if(checkError.isValid){
            console.log('valid');
            // resize image using sharp
            let promo = new PromoCodeModel(req.body);
            
            promo.save()
            .then(promo => {
                res.status(200).json({message: 'Promo code created successfully'});
            })
            .catch(error => console.log(error));
        } else {
            res.status(500).json(checkError.error);
        }
    },

    updatePromoCode(req,res){
        //res.json(req.params);
        PromoCodeModel.findOne({_id: req.params.promoId})
        .exec(function(err, data) {
            //console.log(data);
            if (err){
                console.log(err);
                return res.status(400).json(err);
            }
            //return res.status(200).json(data);;
            //data.start_date = data.start_date.getDate();
        
            res.render('updatePromoCode', {updatePromoData: data});
            
        });
    },

    updatePromo(req,res){
        PromoCodeModel.findOneAndUpdate({promo_code:req.body.promo_code}, req.body, { upsert: true }, function(err){
            if(err) {
                res.status(500).json(err);
            }
            else  res.redirect('/promocode');
        })
    }

}