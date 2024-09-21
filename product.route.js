const express = require('express');
const router = express.Router();
const productService = require('../services/product.service');

// Add Product
router.post('/saveproduct', async (req, res) => {
    try {
        const savedProduct = await productService.addProduct(req.body);
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Products
router.get('/getproduct', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/search', async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: 'Title query parameter is required' });
        }

        const products = await productService.searchByTitle(title);
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete Product
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
