import express from 'express';

import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Route to create a new product
router.post('/add', createProduct);

// Route to get all products
router.get('/', getProducts);

// Route to update a product
router.put('/update/:id', updateProduct);

// Route to delete a product
router.delete('/delete/:id', deleteProduct);

export default router;