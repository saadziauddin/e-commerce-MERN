import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const apiURL = isProduction ? process.env.PRODUCTION_API_URL : process.env.VITE_API_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: apiURL,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization'],
};
app.use(cors(corsOptions));

// Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Middleware to allow next() calls
app.use((req, res, next) => {
    next();
});

// Server Initialization
const port = process.env.PORT || 8090;
app.listen(port, () => { 
    console.log("Server is running at PORT: " + port); 
});

// ======================= Auth Routes ==============================
import signinRouter from './routes/auth/signinRoute.js';
app.post('/api/signin', signinRouter);
import verifyToken from './verifyToken.js';
app.get('/api/signin', verifyToken, (req, res) => { return res.json({ Status: "Success", name: req.name, role: req.role }); });

import signupRouter from './routes/auth/signupRoute.js';
app.post('/api/signup', signupRouter);

import resetRouter from './routes/auth/resetRoute.js';
app.post('/api/verifyEmail', resetRouter);
app.post('/api/resetPassword', resetRouter);

import logoutRouter from './routes/auth/logoutRoute.js';
app.get('/api/logout', logoutRouter);

// ======================= Category Routes =============================
import addCategoryRouter from './routes/categories/addCategoryRoute.js';
app.post('/api/categories/addCategory', addCategoryRouter);

import updateCategoryRouter from './routes/categories/updateCategoryRoute.js';
app.put('/api/updateCategory/:categoryId', updateCategoryRouter);

import deleteCategoryRouter from './routes/categories/deleteCategoryRoute.js';
app.delete('/api/deleteCategory', deleteCategoryRouter);

import fetchCategoriesRouter from './routes/categories/fetchCategoriesRoute.js';
app.get('/api/fetchCategories', fetchCategoriesRouter);
app.get('/api/fetchOnlyRequiredCategories', fetchCategoriesRouter);
app.get('/api/fetchCategoryById/:categoryId', fetchCategoriesRouter);

// ======================= Product Routes ==============================
import addProductRouter from './routes/products/addProductRoute.js';
app.post('/api/products/addProduct', addProductRouter);

import updateProductRouter from './routes/products/updateProductRoute.js';
app.put('/api/updateProduct/:productId', updateProductRouter);

import deleteProductRouter from './routes/products/deleteProductRoute.js';
app.delete('/api/deleteProduct', deleteProductRouter);

import deleteProductImageRouter from './routes/products/deleteProductImageRoute.js';
app.delete('/api/deleteProductImage/:ProductId', deleteProductImageRouter);

import fetchProductsRouter from './routes/products/fetchProductsRoute.js';
app.get('/api/fetchProducts', fetchProductsRouter);
app.get('/api/fetchProductById/:productId', fetchProductsRouter);
app.get('/api/fetchProductByCategory/:categoryName', fetchProductsRouter);
app.get('/api/fetchProductsByCategory/newArrivals', fetchProductsRouter);
app.get('/api/fetchProductsByCategory/bestSellers', fetchProductsRouter);

// ======================= User Routes =================================
import updateUserRouter from './routes/users/updateUserRoute.js';
app.put('/api/updateUser/:userId', updateUserRouter);

import deleteUserRouter from './routes/users/deleteUserRoute.js';
app.delete('/api/deleteUser', deleteUserRouter);

import fetchUsersRouter from './routes/users/fetchUsersRoute.js';
app.get('/api/roles', fetchUsersRouter); // Fetch Roles
app.get('/api/getUser', fetchUsersRouter); // Fetch Users
app.get('/api/getUserById/:userId', fetchUsersRouter); // Fetch User by ID
