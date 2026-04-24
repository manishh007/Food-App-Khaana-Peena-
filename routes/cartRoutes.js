const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// ➕ Add to cart
router.post("/", authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: [{ product: productId, quantity }]
            });
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart" });
    }
});

// 📦 Get user cart
router.get("/", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product"); // 👈 important

        if (!cart) {
            return res.json({ items: [] });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart" });
    }
});

module.exports = router;