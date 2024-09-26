import express from 'express';
import Product from '../../models/productModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.delete('/api/deleteProduct', async (req, res) => {
    const { ProductId } = req.query;
    if (!ProductId) {
        return res.status(400).json({ message: "Product Id is required" });
    }
    try {
        const product = await Product.findById(ProductId);
        if(!product){
            return res.status(400).json({error: "Product not found!"});
        }
        const imageObj = product.images[0];

        if(imageObj && imageObj.imagePath){
            const fullImagePath = path.join(__dirname, '../../', imageObj.imagePath);
            fs.unlink(fullImagePath, (err) => {
                if (err) {
                    console.error('Error deleting product images:', err);
                    return res.status(500).json({ message: 'Failed to delete product images' });
                }
            })
        }

        const deleteProduct = await Product.deleteOne({_id: ProductId});
        if (!deleteProduct) {
            res.status(400).json({ error: "Product not deleted!" });
        } else {
            res.status(200).json({ message: "Product deleted successfully!" });
        }
    } catch (error) {
        console.error("Error during deletion: ", error);
        res.status(500).json({ message: "Internal server error: ", error });
    }
});

export default router;
