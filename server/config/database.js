
const { mongoose } = require('mongoose');

async function connectDB(){
    try {
        mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('MongoDB Database connected.'))
        .catch((err) => console.log('Database connection failed', err));

    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;