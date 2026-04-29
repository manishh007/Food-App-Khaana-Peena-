const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    name: String,
    email: { type: String, unique: true },
    password: String,
}, { timestamps: true });



module.exports = mongoose.model("User", userSchema);