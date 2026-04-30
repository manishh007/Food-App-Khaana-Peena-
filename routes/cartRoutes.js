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
            // 🔍 check if product already exists
            const existingItem = cart.items.find(
                item => item.product.toString() === productId
            );

            if (existingItem) {
                // ✅ increase quantity
                existingItem.quantity += quantity;
            } else {
                // ➕ new product
                cart.items.push({ product: productId, quantity });
            }
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

router.delete("/:productId", authMiddleware, async (req, res) => {
    const { productId } = req.params;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // 🔥 REMOVE ITEM COMPLETELY (no quantity logic)
        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        // 🔥 populate again
        const updatedCart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");

        res.json(updatedCart);

    } catch (error) {
        res.status(500).json({ message: "Error removing item" });
    }
});

router.put("/", authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }


        // 🔥 update quantity
        item.quantity = quantity;

        await cart.save();

        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: "Error updating quantity" });
    }
});

module.exports = router;