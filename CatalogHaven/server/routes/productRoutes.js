const express = require('express');
const router = express.Router();
const cors = require("cors");   
const { newProduct, getProducts, getFeaturedProducts, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/search').get(getProducts);

router.route('/products/featured').get(getFeaturedProducts);

router.route('/admin/products/new').post(isAuthenticatedUser, newProduct);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews').get(isAuthenticatedUser, getProductReviews);

router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;