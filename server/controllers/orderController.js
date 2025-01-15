const Order = require("../models/order");

const Product = require("../models/product");

const newOrder = async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    try {
        // Populate the image URL and public_id for each orderItem
        const populatedOrderItems = await Promise.all(orderItems.map(async (item) => {
            if (!item.product) {
                throw new Error("Product ID is required in each order item.");
            }

            const product = await Product.findById(item.product);

            if (!product) {
                throw new Error(`Product not found with ID: ${item.product}`);
            }

            console.log("Product image field:", product.image);

            let image = {};

            if (product.image?.url && product.image?.public_id) {
                image.url = product.image.url;
                image.public_id = product.image.public_id;
            }
            else {
                console.error(`Invalid image fields for product with ID ${item.product}`);
                throw new Error(`Product with ID ${item.product} must have valid image fields.`);
            }

            item.image = image; 

            return item;
        }));

        // After processing all items, ensure each orderItem has valid image fields
        populatedOrderItems.forEach(item => {
            if (!item.image?.url || !item.image?.public_id) {
                console.error("Missing image fields for order item:", item);
                throw new Error("Each order item must have a valid image with a URL and public_id.");
            }
        });

        const order = await Order.create({
            orderItems: populatedOrderItems,
            shippingInfo,
            itemsPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
        });

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





// Get Single Order
const getSingleOrder = async (req, res, next) => {
    
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new Error("Order not found", 404));
    } 

    res.status(200).json({
        success: true,
        order
    }) 
}


// Get user's orders
const myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate({
                path: 'orderItems.product',  // Populate the product field in orderItems
                select: 'name price images'  // Select only necessary fields (name, price, images)
            });

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Admin Routes

// Get All Orders

const allOrders = async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}

const updateOrders = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new Error("Order not found"));
    }

    console.log("Current order status:", order.orderStatus);

    if (order.orderStatus === "Delivered") {
        return next(new Error("This order has already been delivered"));
    }

    // Update stock for each order item
    for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        
        if (!product) {
            return next(new Error(`Product with ID ${item.product} not found`));
        }

        // Check if there is enough stock
        if (product.stock < item.quantity) {
            return next(new Error(`Insufficient stock for product ${product.name}`));
        }

        // Update the stock
        product.stock -= item.quantity;
        await product.save({ validateBeforeSave: false });
    }

    // Update order status and deliveredAt date
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save({ validateBeforeSave: false });

    console.log("Updated order status:", order.orderStatus); // Log the updated status

    res.status(200).json({
        success: true
    });
};

// Delete Order
const deleteOrder = async (req, res, next) => {
    
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new Error("Order not found", 404));
    }

    await order.deleteOne()

    res.status(200).json({
        success: true
    }) 
}




module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrders,
    deleteOrder
};