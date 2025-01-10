const Product = require('../models/product');

const APIFeatures = require('../utils/apiFeatures');

exports.getFeaturedProducts = async (req, res, next) => {
    
    try {
        const products = await Product.find().limit(6);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch products',
            error: error.message
        });
    }
};


exports.newProduct = async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}

exports.getProducts = async (req, res, next) => {
    try {
        const resPerPage = Number(req.query.limit) || 8;
        const productCount = await Product.countDocuments();

        const { keyword, minPrice, maxPrice } = req.query;

        const min = minPrice ? Number(minPrice) : undefined;
        const max = maxPrice ? Number(maxPrice) : undefined;

        let searchQuery = {};
        if (keyword) {
            searchQuery = {
                name: {
                    $regex: keyword,
                    $options: 'i',
                },
            };
        }

        if (min || max) {
            searchQuery.price = {};
            if (min) searchQuery.price.$gte = min;
            if (max) searchQuery.price.$lte = max;
        }

        console.log("Min Price:", min, "Max Price:", max); 

        console.log("Search Query:", searchQuery);


        const apiFeatures = new APIFeatures(Product.find(searchQuery), req.query)
            .filter()
            .pagination(resPerPage);

        const products = await apiFeatures.query;
        console.log("Fetched Products:", products); // Add this line

        res.status(200).json({
            success: true,
            count: products.length,
            productCount,
            products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch products',
            error: error.message,
        });
    }
};

exports.getSingleProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id).populate('user', 'username');

    if (!product) {
        return res.json({
            success: false,
            message: 'Product not found.'
        })
    }

    res.json({
        success: true,
        product
    })
}

exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.json({
            success: false,
            message: 'Product not found.'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.json({
        success: true,
        product
    })

}

exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.json({
            success: false,
            message: 'Product not found.'
        })
    }

    await product.remove();

    res.json({
        success: true,
        message: 'Product has been deleted.'
    })

}

// Create product review

exports.createProductReview = async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review  = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);
    
    // Checks if the user has already reviewed the product
    const reviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    // If review exists with the user, update it
    if (reviewed) {
        reviewed.comment = comment;
        reviewed.rating = rating;
    // If review doesn't exist (undefined), create it
    } else {
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
    }

    // Calculates product ratings
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });

}

// Get Product's Reviews
exports.getProductReviews = async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
}


// Delete a review from product
exports.deleteReview = async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    // Filter out the review to be deleted
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    // Calculate the number of reviews after deletion
    const numOfReviews = reviews.length;

    // Calculate the new average rating
    const ratings = numOfReviews === 0 ? 0 : reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

    // Update the product with the new reviews, rating, and number of reviews
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        reviews
    });
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you're using JWT for authentication
        const { productId, quantity } = req.body;

        if (!productId || quantity < 1) {
            return res.status(400).json({ success: false, message: 'Invalid input' });
        }

        // Find the user and the product
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if product is already in the cart
        const cartItem = user.cart.find(item => item.product.toString() === productId);

        if (cartItem) {
            // Update the quantity if the product already exists in the cart
            cartItem.quantity += quantity;
        } else {
            // Otherwise, add the new product to the cart
            user.cart.push({ product: productId, quantity });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            cart: user.cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding item to cart' });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res, next) => {
    try {
        const userId = req.user._id; 
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
        }

        const user = await User.findById(userId);


        const cartLengthBefore = user.cart.length;
        user.cart = user.cart.filter((item) => item.product.toString() !== productId);

        if (user.cart.length === cartLengthBefore) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in cart',
            });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            cart: user.cart,
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing item from cart',
            error: error.message,
        });
    }
};

exports.calculateAverageRating = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / product.reviews.length;

    return averageRating;
};