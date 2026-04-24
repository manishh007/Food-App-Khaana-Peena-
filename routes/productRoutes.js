const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ➕ Add product
router.post("/", authMiddleware, async (req, res) => {
    try {

        const product = new Product({
            ...req.body,
            user: req.user.id
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error adding product" });
    }
});

// 📦 Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

router.get("/my-products", authMiddleware, async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 🔥 OWNER CHECK
        if (product.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await product.deleteOne();

        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
});

module.exports = router;