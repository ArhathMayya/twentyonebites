const { request } = require('http')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CategorySchema = new Schema({
    name:{
        type:String,
        require:true
    },
    
    available:{
        type:String,
        require:true
    }
})


const FoodSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    price:{
        type:mongoose.Types.Decimal128,
        require:true
    },
    image:{
        type:String,
        require:false
    },
    description:{
        type:String,
        require:false
    },
    available:{
        type:String,
        require:true
    }
})

const CategoryModel = mongoose.model('categories', CategorySchema);
const FoodModel = mongoose.model('fooditems', FoodSchema);
module.exports = { CategoryModel, FoodModel }