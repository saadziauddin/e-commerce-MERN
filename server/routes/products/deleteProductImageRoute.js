import express from 'express';
import Product from '../../models/productModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.delete('/api/deleteProductImage/:ProductId', async (req, res) => {
    const { ProductId } = req.params;
    const { imageId } = req.body;

    if (!ProductId || !imageId) {
        return res.status(400).json({ message: "Product ID and image ID are required" });
    }

    try {
        const product = await Product.findById(ProductId);
        if (!product) {
            return res.status(404).json({ error: "Product not found!" });
        }

        // Find the image by its _id
        const imageToRemove = product.images.find(image => image._id.toString() === imageId);
        if (!imageToRemove) {
            return res.status(404).json({ error: "Image not found!" });
        }

        // Remove the image from the product's images array
        product.images = product.images.filter(image => image._id.toString() !== imageId);
        await product.save();

        // Remove the image from the file system
        const fullImagePath = path.join(__dirname, '../../../public', imageToRemove.imagePath);
        if (fs.existsSync(fullImagePath)) {
            fs.unlink(fullImagePath, (err) => {
                if (err) {
                    console.error(`Error deleting image ${imageToRemove.imagePath}:`, err);
                } else {
                    console.log(`Image deleted: ${fullImagePath}`);
                }
            });
        } else {
            console.log(`Image file not found at path: ${fullImagePath}`);
        }

        return res.status(200).json({ success: true, message: "Image deleted successfully!" });
    } catch (error) {
        console.error("Error during image deletion:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;
