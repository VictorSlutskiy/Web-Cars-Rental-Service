const Router =require('express').Router;
const userController=require('../controllers/user-controller')
const router = new Router();
const {body}=require('express-validator');
const authMiddleWare  = require('../middlewares/auth-middleware');
const clientController=require('../controllers/client-controller')
const categoriesController=require('../controllers/categories-controller');
const productController = require('../controllers/product-controller');
const rentsController = require('../controllers/rents-controller');

router.post('/registration',
body('email').isEmail(),
body('password').isLength({min:8, max:32}),
userController.registration);


router.post('/login',userController.login);
router.post('/logout',userController.logout);
router.get('/activate/:link',userController.activate);
router.get('/refresh',userController.refresh);
router.get('/users',userController.getUsers);
router.get('/users/:id',userController.getUser);
router.post('/updateUser/:id',userController.updateUser);
router.post('/deleteUser/:id',userController.deleteUser);
router.post('/checkPassword/:id',userController.checkPass);


router.post('/addClient',clientController.addClient);
router.get('/getClient',clientController.getClient);
router.post('/deleteClient',clientController.deleteClient);

router.get('/categories',categoriesController.getCategories);
router.get('/categories/:id',categoriesController.getCategory);
router.post('/addCat',categoriesController.addCategory);
router.post('/deleteCategory/:id',categoriesController.deleteCategory);
router.post('/updateCategory/:id',categoriesController.updateCategory);

router.get('/products/:id',productController.getProduct);
router.get('/products',productController.getProducts);
router.post('/addProduct',productController.addProduct);
router.post('/deleteProduct/:id',productController.deleteProduct);
router.post('/updateProduct/:id',productController.updateProduct);

router.post('/rentReq/:productId',rentsController.rentReq);
router.post('/confirmRent/:id',rentsController.confirmRent);
router.post('/endRent/:id',rentsController.endRent);
router.get('/rent/:id',rentsController.getRent);
router.get('/rentUser/:id',rentsController.getUserRent);
router.get('/rents',rentsController.getRents);
router.post('/deleteRent/:rentId',rentsController.deleteRent);

module.exports = router
