import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import verifyToken from './verifyToken.js';
import dotenv from 'dotenv';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const apiURL = isProduction ? process.env.PRODUCTION_API_URL : process.env.VITE_API_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: apiURL,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization'],
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
    next();
});
const port = process.env.PORT || 8090;
app.listen(port, () => { console.log("Server is running at PORT: " + port); });

// Auth Routes
// Sign in 
import signinRouter from './routes/auth/signinRouter.js';
app.post('/signin', signinRouter);
// Verify JWT Token
app.get('/signin', verifyToken, (req, res) => { return res.json({ Status: "Success", name: req.name, role: req.role }); });
// Sign up
import signupRouter from './routes/auth/signupRouter.js';
app.post('/Register', signupRouter);
// Reset Password
import resetRouter from './routes/auth/resetRouter.js';
app.post('/verifyEmail', resetRouter);
app.post('/resetPassword', resetRouter);
// Logout
import logoutRouter from './routes/auth/logoutRouter.js';
app.get('/Logout', logoutRouter);

// Category Routes
// Add Category
import addCategoryRouter from './routes/categories/addCategoryRouter.js';
app.use('/categories', addCategoryRouter);
// Fetch Categories
import fetchCategoriesRouter from './routes/categories/fetchCategoriesRouter.js'
app.get('/fetchCategories', fetchCategoriesRouter);
// Update Category
import updateCategoryRouter from './routes/categories/updateCategoryRouter.js';
app.put('/UpdateUserData/:userId', updateCategoryRouter);
// Delete Category
import deleteCategoryRouter from './routes/categories/deleteCategoryRouter.js';
app.delete('/Delete', deleteCategoryRouter);

// User Routes
// Fetch Users & Roles
import fetchUsersRouter from './routes/users/fetchUsersRouter.js';
app.get('/Roles', fetchUsersRouter); // Fetch Roles
app.get('/GetUserData', fetchUsersRouter); // Fetch Users
app.get('/GetUserData/:userId', fetchUsersRouter); // Fetch User by ID
// Update User
import updateUserRouter from './routes/users/updateUserRouter.js';
app.put('/UpdateUserData/:userId', updateUserRouter);
// Delete User
import deleteUserRouter from './routes/users/deleteUserRouter.js';
app.delete('/Delete', deleteUserRouter);




// Search Recordings
// import searchDataRouter from './routes/searchRouter.js';
// app.use('/Reports', searchDataRouter);
