const Product = require('../models/product');
const dotenv = require('dotenv').config();
const connectDB = require('../config/database');

const products = require('../data/product');

connectDB();

const seedProducts = async () => {


    try {
        
        await Product.deleteMany();
        console.log("Products have been deleted.");

        await Product.insertMany(products);
        console.log("All products within the json file have been seeded.");

        process.exit();


    } catch (error) {

        console.log("Error caught: ", error);
        process.exit();
        
    }
}

seedProducts();

