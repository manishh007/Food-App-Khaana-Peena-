const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// 📦 Place Order
router.post("/", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // 💰 calculate total
        let totalAmount = 0;

        cart.items.forEach(item => {
            totalAmount += item.product.price * item.quantity;
        });

        // 🧾 create order
        const order = new Order({
            user: req.user.id,
            items: cart.items,
            totalAmount
        });

        await order.save();

        // 🧹 clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: "Error placing order" });
    }
});

router.get("/my-orders", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product");

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product");

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: "Error fetching all orders" });
    }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: "Error updating order" });
    }
});

module.exports = router;