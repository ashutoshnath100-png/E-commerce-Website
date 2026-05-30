import express from 'express';
import { addToCart, removeItem, updateQuantity,getCart } from '../controllers/cartController.js';

const router = express.Router();

// Add item to cart
router.post('/add', addToCart);
// Remove item from cart
router.delete('/remove', removeItem);
// Update item quantity in cart
router.post('/update', updateQuantity);
// Get cart by user ID
router.get('/:userId', getCart);

export default router;