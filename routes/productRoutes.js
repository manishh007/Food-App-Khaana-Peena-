const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { body, validationResult } = require("express-validator");
const adminMiddleware = require("../middleware/adminMiddleware");

// ➕ Add product
router.post(
    "/",
    authMiddleware, adminMiddleware,
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("price").isNumeric().withMessage("Price must be a number"),
        body("description").notEmpty().withMessage("Description is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
    }
);

// 📦 Get all products
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const sort = req.query.sort || "createdAt";

        // 🔍 search filter
        const query = {
            name: { $regex: search, $options: "i" }
        };

        // 📦 fetch data
        const products = await Product.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

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

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
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