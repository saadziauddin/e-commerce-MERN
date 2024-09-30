import express from 'express';
import User from '../../models/userModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.delete('/api/deleteUser', async (req, res) => {
    const { UserId } = req.query;
    if (!UserId) {
        return res.status(400).json({ message: "UserId is required" });
    }
    try {
        const user = await User.findById(UserId);
        if(!user){
            return res.status(400).json({error: "User not found!"});
        }
        const profileImageObj = user.profileImage[0];

        if(profileImageObj && profileImageObj.imagePath){
            const fullImagePath = path.join(__dirname, '../../', profileImageObj.imagePath);
            fs.unlink(fullImagePath, (err) => {
                if (err) {
                    console.error('Error deleting user profile image:', err);
                    return res.status(500).json({ message: 'Failed to delete user profile image' });
                }
            })
        }

        const deleteUser = await User.deleteOne({_id: UserId});
        if (!deleteUser.deletedCount) {
            res.status(400).json({ error: "User not deleted!" });
        } else {
            res.status(200).json({ message: "User deleted successfully!" });
        }
    } catch (error) {
        console.error("Error during deletion: ", error);
        res.status(500).json({ message: "Internal server error: ", error });
    }
});

export default router;
