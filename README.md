
# Online Shopping Platform (Full Stack MERN)

Welcome to the Online Shopping Platform! This is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to sell, order, and discover products on the platform.

## Features

- **User Registration & Authentication**: Users can register, log in, and manage their accounts.
- **Product Management**: Sellers can add, update, and remove products from the marketplace.
- **Product Discovery**: Users can browse and search for products to purchase.
- **Order Management**: Users can place orders for products and track them.
- **Payment Integration**: The platform integrates with Stripe for secure payments and transactions.
- **State Management**: The application uses Redux for managing global state, allowing seamless updates and interactions across different parts of the application.

## Technologies Used

- **Frontend**: React.js with Redux for state management
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Cloud Storage**: Cloudinary for image storage
- **Payment Gateway**: Stripe
- **File Upload**: Express-FileUpload for managing file uploads

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: npm is bundled with Node.js, so you’ll have it once Node.js is installed.
- **MongoDB**: You will need a MongoDB instance running locally or using a cloud service (e.g., MongoDB Atlas).
- **Stripe Account**: Set up a Stripe account to process payments.

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:

   Navigate to the project directory and run the following command to install the required npm packages:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```
    PORT = <your-port-number>

    MONGO_URL = <your-mongo-db-url>
    DB_URI = <your-mongo-db-uri>

    NODE_ENV = DEVELOPMENT

    JWT_SECRET = <your-jwt-secret>
    JWT_EXPIRES_TIME = <your-jwt-expiration-time>

    CLOUDINARY_CLOUD_NAME = <your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY = <your-cloudinary-api-key>
    CLOUDINARY_API_SECRET = <your-cloudinary-api-secret>

    STRIPE_API_KEY = <your-stripe-api-key>
    STRIPE_SECRET_KEY = <your-stripe-secret-key>

    SMTP_HOST = <your-smtp-host>
    SMTP_PORT = <your-smtp-port>
    SMTP_EMAIL = <your-smtp-email>
    SMTP_PASSWORD = <your-smtp-password>
    SMTP_FROM_EMAIL = <your-smtp-from-email>
    SMTP_FROM_NAME = <your-smtp-from-name>
   ```

4. **Start the development server**:

   For development purposes, you can start the server using:

   ```bash
   npm run dev
   ```

   This will run both the backend and the frontend in development mode.

### Deployment

To prepare for deployment, you need to build the React app and start the production server.

1. **Build the React app**:

   Run the following command to create a production-ready build of your React application:

   ```bash
   npm run build
   ```

2. **Start the production server**:

   After building the React app, start the production server using:

   ```bash
   npm start
   ```

   This will run the backend on the specified port (default: 8000) and serve the static files from the `build` directory (or dist).

### Accessing the Application

Once the server is running, open your browser and go to:

```
http://localhost:8000
```

You should be able to interact with the platform, browse products, place orders, and manage your seller account.

## Project Structure

```
context/
  ├── dist/
  │    └── index.html
  ├── public/
  └── server/
       └── app.js
```

- **`server/`**: Contains the backend code (Node.js with Express).
- **`dist/`**: Contains the build output from the React frontend.

## Contributing

Feel free to fork this repository and submit pull requests. We welcome any suggestions, bug fixes, or feature requests!

## License

This project is open-source and available under the [MIT License](LICENSE).
