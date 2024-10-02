const Product = require('../models/product');

const APIFeatures = require('../utils/apiFeatures');

exports.getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await Product.find().limit(6);
        console.log('Fetched products:', products); // Log the fetched products

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Error fetching products:', error); // Log the error
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

    const resPerPage = 9;
    const productCount = await Product.countDocuments();
    
    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)
    const products = await apiFeatures.query;
    

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        message: 'This route will show all products in the database.',
        products
    })
}

exports.getSingleProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

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
