const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    category: String,
    createTime: Date,
    updateTime: Date,
    createBy: String
});

module.exports = mongoose.model('ProductModel', ProductSchema)