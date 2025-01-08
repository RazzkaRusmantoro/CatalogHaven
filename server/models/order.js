const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    orderItems: [
        {
            name: {
                type: String,   
                required: true
            },  
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {  
                    type: String,
                    required: true  
                }
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],

    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },

    paidAt: {
        type: Date
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },

    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },

    deliveredAt: {
        type: Date
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
        
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;