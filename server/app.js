const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const errorMiddleware = require('./middlewares/errors');
const fileupload = require('express-fileupload');
const path = require('path');

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Allowed origins
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  credentials: true,  // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions)); // Apply CORS middleware


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
app.use(express.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/productRoutes'));
app.use('/', require('./routes/orderRoutes'));
app.use('/', require('./routes/paymentRoutes'));

// Serve static files from React's build (dist)
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Middleware to handle errors
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}.`));
