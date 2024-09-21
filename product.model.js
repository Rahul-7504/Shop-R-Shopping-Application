const mongoose = require('mongoose');
const { type } = require('os');
require('../db/config');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true ,},
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true } 
});


const Product = mongoose.model('Product', productSchema);


module.exports = Product;