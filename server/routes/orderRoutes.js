const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, myOrders, allOrders, updateOrders, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../middlewares/auth');


router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/orders/profile').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, allOrders);

router.route('/admin/order/:id')
    .put(isAuthenticatedUser, updateOrders)
    .delete(isAuthenticatedUser, deleteOrder);                        

module.exports = router;