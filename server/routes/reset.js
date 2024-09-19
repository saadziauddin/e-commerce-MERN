import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

router.post('/passwordReset', async (req, res) => {
    const userData = req.body;


    try{
        const verifyEmail = await User.findOne({email: userData.email});

        if(!verifyEmail){
            return res.status(400).json({error: "Email not verified!"});
        }

        
        const pool = await sql.connect(config);
        const result = await pool.request().input('CurrentPassword', sql.NVarChar, UserData.currentPassword)
        .query('SELECT * FROM Users WHERE Password = @CurrentPassword');

        if(result.recordset.length > 0){
            const userData = result.recordset[0];
            const PasswordMatch = await bcrypt.compare(UserData.currentPassword.toString(), userData.PasswordHash);
            if(PasswordMatch){
                if(UserData.newPassword !== UserData.confirmNewPassword){
                    return res.status(400).json({ error: "New password and confirm new password do not matched!"});
                } else{
                    bcrypt.hash(UserData.newPassword, 10, async (error, NewHashedPassword) => {
                        if(error){
                            console.log("Error hashing new password", error);
                            return res.status(500).json({error: "Internal Server error while hashing new password!"});
                        }
                        else{
                            await pool.request()
                            .input('UserId', sql.Int, userData.UserId)
                            .input('NewPassword', sql.NVarChar, UserData.newPassword)
                            .input('ConfirmNewPassword', sql.NVarChar, UserData.confirmNewPassword)
                            .input('NewHashedPassword', sql.NVarChar, NewHashedPassword)
                            .query('UPDATE Users SET Password = @NewPassword, ConfirmPassword = @ConfirmNewPassword, PasswordHash = @NewHashedPassword, LoginCounter = 1 WHERE UserId = @UserId');

                            return res.status(200).json({message: "Password Updated Successfully!"});
                        }
                    })           
                }
            } else {
                return res.status(400).json({ error: "Current password not matched!" });
            }
        } else{
            return res.status(400).json({ error: "Invalid Current Password!" });
        }
    } catch (error) {
        console.error("Error occurred during password reset:", error);
        res.status(500).json({ error: "Password reset error in server!" });
    }
});

export default router;