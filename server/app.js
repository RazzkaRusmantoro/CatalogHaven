const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const cloudinary = require('cloudinary').v2;
const errorMiddleware = require('./middlewares/errors');
const fileupload = require('express-fileupload');
const path = require('path');
const { fileURLToPath } = require('url');


console.log('__dirname:',__dirname); 

// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Database connected.'))
.catch((err) => console.log('Database connection failed', err));

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(fileupload({useTempFiles: true}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/productRoutes'));
app.use('/', require('./routes/orderRoutes'));
app.use('/', require('./routes/paymentRoutes'));

app.use(express.static(path.join(__dirname, '../dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Middleware to handle errors
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}.`));