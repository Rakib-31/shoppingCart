const {
    login,
    register,
    loginPage,
    panel,
    products,
    addproducts,
    saveProduct,
    getProducts,
    getPromoCode,
    addNewPromo,
    savePromoCode,
    updatePromoCode,
    updatePromo,
    editProduct,
    updateProduct
} = require('../controller/adminController');

const router = require('express').Router();
const AddProductModel = require('../model/addProductModel');
const Admin = require('../model/admin');
const validate = require('../validators/validator');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/adminlogin', login);
router.post('/adminregister', register);
router.get('/', loginPage);

router.get('/panel', panel);

router.get('/getallproducts', products);
router.get('/addproducts', addproducts);
router.post('/saveProduct',upload.single('image'), saveProduct);
router.get('/editproduct/:productId', editProduct);
router.post('/updateProduct', updateProduct);

router.get('/updatepromo/:promoId', updatePromoCode);
router.get('/promocode', getPromoCode);
//router.get('/updatepromo', updatePromoCode);
router.get('/addnewpromo', addNewPromo);
router.post('/savepromo', savePromoCode);
router.post('/updatepromo', updatePromo);

module.exports = router;