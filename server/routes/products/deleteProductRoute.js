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
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        const product = await Product.findById(ProductId);
        if (!product) {
            return res.status(404).json({ error: "Product not found!" });
        }

        // Check if the product has images and delete them from the file system
        if (product.images && product.images.length > 0) {
            product.images.forEach((imageObj) => {
                if (imageObj && imageObj.imagePath) {
                    const fullImagePath = path.join(__dirname, '../../../public', imageObj.imagePath);
                    if (fs.existsSync(fullImagePath)) {
                        fs.unlink(fullImagePath, (err) => {
                            if (err) {
                                console.error(`Error deleting image ${imageObj.imagePath}:`, err);
                            } else {
                                console.log(`Image deleted: ${fullImagePath}`);
                            }
                        });
                    } else {
                        console.log(`File does not exist at path: ${fullImagePath}`);
                    }
                }
            });
        }

        // Delete the product from the database
        const deleteProduct = await Product.deleteOne({ _id: ProductId });
        if (!deleteProduct) {
            return res.status(400).json({ error: "Product not deleted!" });
        }
        return res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error("Error during deletion:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;

