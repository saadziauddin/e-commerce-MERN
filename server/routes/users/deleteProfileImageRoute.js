// import express from 'express';
// import User from '../../models/userModel.js';
// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// router.delete('/api/deleteProfileImage/:userId', async (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//     }

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found!" });
//         }

//         // Check if the user has a profile image
//         if (!user.profileImage) {
//             return res.status(404).json({ error: "No profile image to delete!" });
//         }

//         // Get the path of the profile image
//         const fullImagePath = path.join(__dirname, '../../public', user.profileImage);

//         // Remove the image file from the filesystem if it exists
//         if (fs.existsSync(fullImagePath)) {
//             fs.unlink(fullImagePath, (err) => {
//                 if (err) {
//                     console.error(`Error deleting image ${user.profileImage}:`, err);
//                     return res.status(500).json({ error: "Error deleting image file." });
//                 }
//                 console.log(`Image deleted: ${fullImagePath}`);
//             });
//         } else {
//             console.log(`Image file not found at path: ${fullImagePath}`);
//         }

//         // Remove the profileImage field from the user document
//         user.profileImage = null;
//         await user.save();

//         return res.status(200).json({ success: true, message: "Profile image deleted successfully!" });
//     } catch (error) {
//         console.error("Error during profile image deletion:", error);
//         return res.status(500).json({ message: "Internal server error", error });
//     }
// });

// export default router;

import express from 'express';
import User from '../../models/userModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.delete('/api/deleteProfileImage/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        // Ensure profileImage is a string before attempting to delete
        const profileImagePath = Array.isArray(user.profileImage) ? user.profileImage[0] : user.profileImage;
        
        // Check if the user has a profile image
        if (!profileImagePath) {
            return res.status(404).json({ error: "No profile image to delete!" });
        }

        const profileImageObj = user.profileImage[0];
        if(profileImageObj && profileImageObj.imagePath){
            const fullImagePath = path.join(__dirname, '../../public', profileImageObj.imagePath);
            if (fs.existsSync(fullImagePath)) {
                fs.unlink(fullImagePath, (err) => {
                    if (err) {
                        console.error(`Error deleting image ${profileImagePath}:`, err);
                        return res.status(500).json({ error: "Failed to delete user profile image." });
                    }
                    console.log(`Image deleted: ${fullImagePath}`);
                });
            } else {
                console.log(`Image file not found at path: ${fullImagePath}`);
            }
        }

        // Clear the profileImage field in the user document
        user.profileImage = null;
        await user.save();

        return res.status(200).json({ success: true, message: "Profile image deleted successfully!" });
    } catch (error) {
        console.error("Error during profile image deletion:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;
