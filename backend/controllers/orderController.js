import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";

export const placeOrder = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { userId,address }= req.body;
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        console.log("User ID:", userId);
        console.log("CART:", JSON.stringify(cart, null, 2));
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Prepare Order Items
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));

        // Calculate Total Amount
        const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Deduct stock from Products
        for (let item of cart.items) {
            await Product.findByIdAndUpdate(item.productId._id,{ $inc: { stock: -item.quantity}});
        }
        // Create Order
        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD,"
        });

        // Clear the user's cart
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to place order', error });
    }
}