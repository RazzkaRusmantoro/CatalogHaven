const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user");
const bodyParser = require('body-parser');

// Process Stripe Payments
exports.processPayment = async (req, res, next) => {
    try {
        const { amount, userId } = req.body;

        if (!amount) {
            return res.status(400).json({ success: false, message: "Amount is required." });
        }

        if (userId) {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(400).json({ success: false, message: "User not found." });
            }

            if (!user.stripeAccountId) {
                const account = await stripe.accounts.create({ type: 'standard' });
                user.stripeAccountId = account.id;
                await user.save();
            }

            const paymentIntent = await stripe.paymentIntents.create(
                {
                    amount,
                    currency: "usd",
                    metadata: { integration_check: "accept_a_payment" },
                },
                {
                    stripeAccount: user.stripeAccountId,
                }
            );

            return res.status(200).json({
                success: true,
                client_secret: paymentIntent.client_secret,
            });
        }

        // Fallback for platform-level payments
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            metadata: { integration_check: "accept_a_payment" },
        });

        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error processing payment:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Send Stripe API Key
exports.sendStripeApi = async (req, res, next) => {
    console.log('Sending Stripe API key...');
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
}

// Create Stripe Account Link
exports.createStripeAccountLink = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log('Creating Stripe account link for userId:', userId);

        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found for userId:', userId);
            return res.status(400).json({ message: 'User not found' });
        }

        if (!user.stripeAccountId) {
            console.log('User does not have a Stripe account, creating one...');
            const account = await stripe.accounts.create({
                type: 'standard',
            });
            user.stripeAccountId = account.id;
            await user.save();
            console.log('Stripe account created for user. Account ID:', account.id);
        }

        // Create account link for onboarding
        const accountLink = await stripe.accountLinks.create({
            account: user.stripeAccountId,
            refresh_url: 'http://localhost:5173/sell/dashboard',
            return_url: 'http://localhost:5173/sell/dashboard',
            type: 'account_onboarding',
        });

        console.log('Account link created. URL:', accountLink.url);
        return res.json({ success: true, url: accountLink.url });
    } catch (error) {
        console.error('Stripe onboarding error:', error);
        return res.status(500).json({ success: false, message: 'Failed to initiate Stripe onboarding' });
    }
};

// API to check if a user has linked a Stripe account
exports.isStripeLinked = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Checking if Stripe account is linked for userId:', userId);

        const user = await User.findById(userId);
        if (!user || !user.stripeAccountId) {
            console.log('User or Stripe account not found. Returning isLinked: false');
            return res.status(200).json({ isLinked: false });
        }

        const account = await stripe.accounts.retrieve(user.stripeAccountId);
        console.log('Stripe account retrieved:', account);

        return res.status(200).json({ isLinked: account.details_submitted });
    } catch (error) {
        console.error('Error checking if Stripe account is linked:', error);
        res.status(500).json({ message: error.message });
    }
};

// Stripe account verification after onboarding
exports.verifyStripeAccountLink = async (req, res) => {
    try {
        const { accountId } = req.body; // The account ID from the Stripe return URL
        console.log('Verifying Stripe account link for accountId:', accountId);

        const userId = req.user._id;
        console.log('User ID from session:', userId);

        // Retrieve the user
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found for userId:', userId);
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Retrieve the Stripe account
        const account = await stripe.accounts.retrieve(accountId);
        console.log('Stripe account retrieved:', account);

        // Check if the account is fully set up
        if (account.details_submitted) {
            console.log('Stripe account setup complete, linking account...');
            user.stripeAccountId = account.id;
            await user.save();
            return res.status(200).json({ success: true, message: 'Stripe account linked successfully' });
        } else {
            console.log('Stripe account not fully set up');
            return res.status(400).json({ success: false, message: 'Stripe account not fully set up' });
        }
    } catch (error) {
        console.error('Error verifying Stripe account:', error);
        return res.status(500).json({ success: false, message: 'Failed to verify Stripe account' });
    }
};
