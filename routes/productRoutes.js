const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ➕ Add product
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);
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

module.exports = router;