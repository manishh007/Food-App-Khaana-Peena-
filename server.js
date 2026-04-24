const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(5000, () => {
    console.log("Server running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));