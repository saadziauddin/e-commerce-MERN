import express from 'express';
import Product from '../../models/productModel.js';
import mongoose from 'mongoose';

const router = express.Router();

// Fetch Products
router.get('/api/fetchProducts', async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.log("Error fetching products: ", error);
        return res.status(500).json({error: "Internal server error while fetching products!"});
    }
});

// Fetch Product by Id
router.get('/api/fetchProductById/:productId', async (req, res) => {
    const productId = new mongoose.Types.ObjectId(req.params.productId);
    try {
        const product = await Product.find({_id: productId});
        return res.status(200).json({product});
    } catch (error) {
        console.log("Error fetching product by Id: ", error);
    }
});

// Fetch Product by Category
router.get('/api/fetchProductByCategory/:categoryName', async (req, res) => {
    const categoryName = (req.params.categoryName);
    try {
        const fetchCategory = await Product.find({category: categoryName});
        return res.status(200).json({fetchCategory});
    } catch (error) {
        console.log("Error fetching product by Category: ", error);
    }
});

// Fetch products whose category = New Arrivals
router.get('/api/fetchProductsByCategory/newArrivals', async (req, res) => {
    try {
        const products = await Product.find({category: 'New Arrivals'});
        return res.status(200).json({products});
    } catch (error) {
        console.log("Error fetching products whose category = New Arrivals: ", error);
    }
});

// Fetch products whose category = Best Sellers
router.get('/api/fetchProductsByCategory/bestSellers', async (req, res) => {
    try {
        const products = await Product.find({category: 'Best Sellers'});
        return res.status(200).json({products});
    } catch (error) {
        console.log("Error fetching products whose category = Best Sellers: ", error);
    }
});

export default router;
