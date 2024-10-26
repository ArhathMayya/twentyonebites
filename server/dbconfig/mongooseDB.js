const mongoose = require('mongoose');
require('dotenv').config()

// Define MongoDB URL directly in the code
// const mongoUrl = 'mongodb://192.168.1.100:27017/tewntyonebites';
const mongoUrl= process.env.MONGODB_URL

// Debugging - Print MongoDB URL to check if it's set
console.log('MongoDB URL:', mongoUrl);

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error while connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDb;
