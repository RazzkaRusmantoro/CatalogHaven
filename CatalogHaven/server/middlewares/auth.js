const User = require('../models/user');
const jwt = require('jsonwebtoken');

const isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Login to access this resource' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();

}

module.exports = { isAuthenticatedUser};