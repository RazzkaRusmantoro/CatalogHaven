const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Missing product name.'],
        trim: true,
        maxLength: [100, 'Product name must not exceed 100 characters.']
    },

    price: {
        type: Number,
        required: [true, 'Missing product price.'],
        min: [0, 'Price must be a positive number.'],
        max: [999999, 'Product price must not exceed 999999.']
    },

    discount: {
        type: Number, 
        default: 0, // Discount is optional and defaults to 0 (no discount)
        min: [0, 'Discount cannot be negative.'],
        max: [100, 'Discount cannot exceed 100%.'] // Assuming it's a percentage
    },

    description: {
        type: String,
        required: [true, 'Missing product description.'],
    },

    ratings: {
        type: Number,
        default: 0,
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },

            url: {
                type: String,
                required: true
            },

        }
    ],

    category: {
        type: String,
        required: [true, 'Missing product category.'],
        enum: {
            values: [
                'Automotive',
                'Books & Media',
                'Electronics',
                'Fashion',
                'Grocery',
                'Health, Beauty, & Personal Care',
                'Home & Kitchen',
                'Musical Instruments',
                'Pet Supplies',
                'Sports & Fitness',
                'Toys & Games',
                'Video Games'
            ],
            message: 'Please select correct category for product.'
        }
    },

    seller: {
        type: String,
        required: [true, 'Missing product seller.'],
    },
    
    stock: {
        type: Number,
        required: [true, 'Missing product stock.'],
        min: [0, 'Stock cannot be negative.'],
        default: 0
    },
    
    numReviews: {
        type: Number,
        default: 0
    },
    
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },

            rating: {
                type: Number,
                required: true
            },
            
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    creationDate: {
        type: Date,
        default: Date.now
    }

});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
