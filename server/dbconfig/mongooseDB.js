require('dotenv').config(); 
const mongoose = require('mongoose')


const mongoUrl = process.env.MONGODB_URL;

const connectToMongoDb = async()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log('Connected to mongodb')
        return mongoose.connection
    } catch (err){
        console.error('Error while connecting to mongdb: ',err)
        throw err;
    }
};

module.exports = connectToMongoDb