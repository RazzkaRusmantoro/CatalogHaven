const express = require('express');
const router = express.Router();

const { processPayment, sendStripeApi, createStripeAccountLink, isStripeLinked, verifyStripeAccountLink } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi);
router.route('/stripe/onboarding').post(isAuthenticatedUser, createStripeAccountLink);
router.route('/stripe/link-status/:userId').get(isAuthenticatedUser, isStripeLinked);
router.route('/stripe/verify-stripe').post(isAuthenticatedUser, verifyStripeAccountLink);

module.exports = router;