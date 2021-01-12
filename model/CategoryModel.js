const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('CategoryModel', CategorySchema);