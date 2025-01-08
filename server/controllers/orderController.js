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

    const order = await Order.create({
        orderItems,
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
    })

}

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