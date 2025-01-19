const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const registerUser = async (req, res) => {
    try {
        const { fname, lname, email, username, password } = req.body;

        // Check if fname/lname is entered
        if (!fname || !lname) {
            return res.status(400).json({
                error: 'Full name is required.'
            });
        }

        // Check if password is valid (at least 6 characters)
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters long.'
            });
        }

        // Check if email exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: 'Email already exists.'
            });
        }

        // Check if username exists
        const exist2 = await User.findOne({ username });
        if (exist2) {
            return res.status(400).json({
                error: 'Username already exists.'
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await User.create({
            fname,
            lname,
            email,
            username,
            password: hashedPassword
        });

        // Generate token
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
                user: user.username,
                fname: user.fname,
                lname: user.lname
            },
            process.env.JWT_SECRET,
            {}
        );

        // Send the token in a cookie and respond with the user data
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'DEVELOPMENT' }).json({
            success: true,
            user,
            token
        });

    } catch (error) {
        console.error("Error caught: ", error);
        return res.status(500).json({
            error: 'Server error. Please try again later.'
        });
    }
};


// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists by checking email
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'User does not exist.'
            })
        }

        // Check if passwords match
        const match = await comparePassword(password, user.password);
        if (match) {
            // Create the token
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    user: user.username,
                    fname: user.fname,
                    lname: user.lname
                },
                process.env.JWT_SECRET,
                {}
            );

            // Send the token in a cookie and respond with the user data
            res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'DEVELOPMENT'}).json({
                success: true,
                user,
                token
            });

        } else {
            res.json({
                error: 'Incorrect password.'
            });
        }


    } catch (error) {
        console.log('Error caught: ', error);
    }
}


// Forgot Password

const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new Error('User not found; email does not exist with a user.', 404));
    }

    const resetToken = user.getResetPasswordToken();

    // Acquire reset token
    await user.save({validateBeforeSave: false});

    // Form reset password URL
    const resetURL = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Password reset token: \n\n${resetURL}\n\n`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Password Reset | Catalog Haven',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new Error(error.message || 'Internal Server Error'));
    }
}

const resetPassword = async (req, res, next) => {
    try {
        // Hash the token from the URL parameter
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // Find the user by the reset token and ensure it hasn't expired
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        // If no user is found or token expired
        if (!user) {
            return res.json({
                error: 'Password reset token is invalid or has expired.'
            });
        }

        // Check if the new password and confirm password match
        const { newPassword, confirmPassword } = req.body;
        if (!newPassword || !confirmPassword) {
            return res.json({
                error: 'Please provide both a new password and a confirmation password.'
            });
        }

        if (newPassword !== confirmPassword) {
            return res.json({
                error: 'New password and confirmation password do not match.'
            });
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;

        // Clear the reset token and expiration
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // Save the updated user with the new password
        await user.save();

        // Create a new JWT token for the user
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
                user: user.username,
                fname: user.fname,
                lname: user.lname
            },
            process.env.JWT_SECRET,
            {}
        );

        // Send the token in a cookie and respond with user data
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'DEVELOPMENT' }).json({
            success: true,
            user,
            token
        });

    } catch (error) {
        console.log('Error caught: ', error);
        res.json({
            error: 'An error occurred while resetting the password.'
        });
    }
};

const getProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new Error(`User not located with ID: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    });
}


const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        // Compare the old password
        const matched = await comparePassword(req.body.oldPassword, user.password);
        if (!matched) {
            return res.json({
                error: 'Old password is incorrect.'
            });
        }

        // Check if new password and confirm password match
        const { password, confirmPassword } = req.body;
        if (!password || !confirmPassword) {
            return res.json({
                error: 'Please provide both a new password and a confirmation password.'
            });
        }

        if (password !== confirmPassword) {
            return res.json({
                error: 'New password and confirmation password do not match.'
            });
        }

        // Hash new password
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;

        await user.save();

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
                user: user.username,
                fname: user.fname,
                lname: user.lname
            },
            process.env.JWT_SECRET,
            {}
        );

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'DEVELOPMENT' }).json({
            success: true,
            user,
            token
        });

    } catch (error) {
        console.log('Error caught: ', error);
        res.json({
            error: 'An error occurred while updating the password.'
        });
    }
};

const updateProfile = async (req, res, next) => {
    try {
        // Destructure the new data sent from the request body
        const newUserData = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
        };

        // Check if the email is already taken by another user
        const existingEmailUser = await User.findOne({ email: newUserData.email });
        if (existingEmailUser && existingEmailUser._id.toString() !== req.user.id) {
            return res.json({
                error: 'Email is already taken by another user.',
            });
        }

        // Check if the username is already taken by another user
        const existingUsernameUser = await User.findOne({ username: newUserData.username });
        if (existingUsernameUser && existingUsernameUser._id.toString() !== req.user.id) {
            return res.json({
                error: 'Username is already taken by another user.',
            });
        }

        // Update the user profile with the new data
        const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,  // Return the updated user
            runValidators: true,  // Validate the updated data based on the model
            useFindAndModify: false,  // Use the native findOneAndUpdate() method
        });

        

        // Return the updated user data in the response
        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        console.log('Error caught: ', error);
        res.json({
            error: 'An error occurred while updating the profile.',
        });
    }

}

const updateProfilePicture = async (req, res, next) => {
    try {
        // Only delete the old avatar if it exists (has a public_id)
        if (req.user.avatar && req.user.avatar.public_id) {
            await cloudinary.uploader.destroy(req.user.avatar.public_id);
        } else {
            console.log('No avatar to delete or missing public_id.');
        }

        // Check if a file is uploaded using express-fileupload
        if (req.files && req.files.avatar) {
            const avatarFile = req.files.avatar;

            // Upload the avatar file to Cloudinary
            const myCloud = await cloudinary.uploader.upload(avatarFile.tempFilePath, {
                folder: 'avatars',
                width: 300,
                crop: 'scale',
            });

            // Save the new avatar's public_id and URL to the user's profile
            req.user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };

            console.log('New avatar uploaded successfully.');
        } else {
            console.log('No file provided.');
        }

        // Save the updated user profile
        await req.user.save();

        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        console.log('Error caught: ', error);
        res.json({
            error: 'An error occurred while updating the profile picture.',
        });
    }
};



const logoutUser = async (req, res, next) => {

    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out."
    })

}


// Admin Routes

const getAllUsers = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
}


const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Error(`User not located with ID: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
}

const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Error(`User not located with ID: ${req.params.id}`));
    }

    // Also remove avatar from cloudinary (complete later)

    await user.deleteOne();

    res.status(200).json({
        success: true
    })
}


module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getProfile,
    updatePassword,
    updateProfile,
    updateProfilePicture,
    logoutUser,

    getAllUsers,
    getUser,
    deleteUser
};