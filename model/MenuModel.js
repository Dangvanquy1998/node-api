const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    id: String,
    title: String,
    path: String
})

module.exports = mongoose.model('MenuModel', MenuSchema);

