// productService.js
const Product = require('../models/product.model');

const productService = {
    async addProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    },

    async getAllProducts() {
        return await Product.find();
    },

    async searchByTitle(title) {
        return await Product.find({ title: { $regex: title, $options: 'i' } });
    },
    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
    
};

module.exports = productService;
