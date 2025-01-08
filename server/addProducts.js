// addProducts.js

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Product = require('./models/product'); // Adjust the path as necessary

// Connect to MongoDB Commit Test
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Database connected.');
}).catch((err) => {
  console.log('Database connection failed', err);
  process.exit(1);
});

// Function to add products
const addProducts = async () => {
  try {
    const products = [
      {
        name: 'UTRAI Jump Starter Car Battery Jstar Mini, 12V 1000A Power Pack Auto Battery Booster',
        price: 63.71,
        description: `The Utrai Jump Starter is a powerful and compact device designed to ensure your safety and convenience while jump-starting your vehicle.
Featuring high-quality intelligent jumper clamps with an LED screen, it provides over-current, short circuit, overload, over-voltage, and over-charge protection, keeping you safe during use. With a peak current of 1000 amps, it can easily jump-start vehicles with engines up to 6.0L petrol or 4.5L diesel. Its compact design allows it to be stored conveniently in your trunk or under the car seat.
The 13000mAh battery, equipped with Utrai Fast Charging technology, offers an emergency boost of power for phones, tablets, and more.
Additionally, the built-in LED flashlight with three modes (Lighting, SOS, Strobe) is perfect for emergency and nighttime use.
The package includes the Utrai Jump Starter, jumper cable with clamps, manual, USB charging cable (charger not included; a 5V/3A adapter or car charger is recommended).`,
        ratings: 0,
        images: [
          {
            public_id: 'UTRAI_rvwat1',
            url: 'https://res.cloudinary.com/djxbnrppx/image/upload/v1722106424/UTRAI_rvwat1.jpg',
          },
        ],
        category: 'Automotive',
        seller: 'UTRAI',
        stock: 32,
        numReviews: 0,
        reviews: [],
      },
      {
        name: 'Aircraft Quality Waterless Car Wash Wax Kit - 144 oz.',
        price: 79.99,
        description: `This high-performance, eco-friendly waterless wash and wax kit is perfect for cars, boats, and RVs.
It cleans and protects with a non-stick UV coating and can be used anywhere—home, office, parking lots, and more.
The 144 oz. kit washes up to 36 cars or waxes up to 57 cars.
It features a biodegradable, plant-based formula that's safe on all surfaces and meets stringent aviation cleaning standards.
The kit includes a gallon of product, a 16 oz. spray bottle, four microfiber towels, and guides for use.
Guaranteed to deliver top-notch results or your money back.`,
        ratings: 0,
        images: [
          {
            public_id: 'washwaxall_fjduwd',
            url: 'https://res.cloudinary.com/djxbnrppx/image/upload/v1722106485/washwaxall_fjduwd.jpg',
          },
        ],
        category: 'Automotive',
        seller: 'Aero Cosmetics',
        stock: 50,
        numReviews: 0,
        reviews: [],
      },

      {
        name: 'Portable Bluetooth Speaker - HD Sound, IPX5 Waterproof, 24H Playtime, TWS Pairing, BT5.3',
        price: 19.99,
        description: `This wireless Bluetooth speaker offers immersive sound with dual drivers and advanced technology for minimal distortion.
It features rugged, IPX5 weather resistance, making it ideal for outdoor use.
Enjoy up to 24 hours of playtime and extended Bluetooth 5.3 range up to 100 feet.
The speaker includes customizable multicolor light effects that sync with the music, adding excitement to any event.
The package comes with a Type-C charging cable, quick start guide, and lifetime technical support.It also has a built-in microphone for hands-free calls and an AUX jack for additional connectivity.`,
        ratings: 0,
        images: [
          {
            public_id: 'bolabutty_y6topm',
            url: 'https://res.cloudinary.com/djxbnrppx/image/upload/v1722106564/bolabutty_y6topm.jpg',
          },
        ],
        category: 'Electronics',
        seller: 'BolaButty',
        stock: 92,
        numReviews: 0,
        reviews: [],
      },

      {
        name: 'HyperX Cloud Stinger 2 - Gaming Headset with DTS Headphones',
        price: 32.99,
        description: `The HyperX Cloud Stinger 2 Core is a gaming headset offering DTS Headphone Spatial Audio for immersive 3D sound and accurate localization. It features 40mm directional drivers for enhanced bass and clear audio, a lightweight over-ear design for comfort during extended gaming sessions, and a swivel-to-mute microphone for improved in-game chat. The headset includes easy-access audio controls and a durable adjustable steel slider. It is compatible with PS4, PS5, Xbox, and PC.`,
        ratings: 0,
        images: [
          {
            public_id: 'hyperx_dwpidk',
            url: 'https://res.cloudinary.com/djxbnrppx/image/upload/v1722106598/hyperx_dwpidk.jpg',
          },
        ],
        category: 'Electronics',
        seller: 'HyperX',
        stock: 62,
        numReviews: 0,
        reviews: [
        ],
      },

      {
        name: 'GAP Boys Logo Full Zip Hoodie for Babies',
        price: 13.99,
        description: 'The GAP Baby Boys Playtime Favorites Logo Full Zip Hoodie is a cozy and stylish wardrobe essential made from super soft fleece. It features a full zip closure and is machine washable for easy care. Designed to fit various ages, it embodies Gap\'s inclusive and optimistic American style. Note that sizes 0-24M may come with or without ears due to supply changes.',
        ratings: 0,
        images: [
          {
            public_id: 'gap_baby_boy_n3qfeg',
            url: 'https://res.cloudinary.com/djxbnrppx/image/upload/v1722109721/gap_baby_boy_n3qfeg.jpg',
          },
        ],
        category: 'Fasion',
        seller: 'GAP',
        stock: 51,
        numReviews: 0,
        reviews: [
        ],
      },

      {
        name: 'Super Smash Bros. Ultimate - Nintendo Switch',
        price: 54.99,
        description: `Super Smash Bros. Ultimate is a popular fighting game for the Nintendo Switch, featuring a vast roster of characters from various franchises. Players can battle it out in fast-paced, multiplayer combat with a variety of stages and game modes. The game emphasizes both competitive and casual play, offering a comprehensive and engaging experience for fans of the series.`,
        ratings: 0,
        images: [
          {
            public_id: 'smashultimate_zimkjj',
            url: 'https://res.cloudinary.com/djxbnrppx/image/upload/v1722106636/smashultimate_zimkjj.jpg',
          },
        ],
        category: 'Video Games',
        seller: 'Nintendo',
        stock: 39,
        numReviews: 0,
        reviews: [
        ],
      },


    ];

    await Product.insertMany(products);
    console.log('Products added successfully.');
  } catch (error) {
    console.log('Error adding products:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the function to add products
addProducts();
