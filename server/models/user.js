const mongoose = require('mongoose');
const {Schema} = mongoose; 
const crypto = require('crypto');

const userSchema = new Schema({
    fname: String,
    lname: String,
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: String,

    avatar: {
        public_id: {
            type: String,
        },

        url: {
            type: String,
        }
    },

    cart: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product', // Reference to ProductModel
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1'],
                default: 1,
            },
        },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date
});


// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}   
    
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel; 