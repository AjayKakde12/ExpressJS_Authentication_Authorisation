const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    quantity: {
        type: Number
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    visible: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

module.exports = mongoose.model("product", ProductSchema);