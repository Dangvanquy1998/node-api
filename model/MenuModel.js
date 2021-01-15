const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    id: String,
    title: String,
    path: String,
    hasChildren: String,
    level: String,
    children: [{
        id: String,
        title: String,
        path: String,
        level: String,
        parentId: String
    }]
})

module.exports = mongoose.model('MenuModel', MenuSchema);

