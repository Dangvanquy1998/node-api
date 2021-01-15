const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
 id: String,
 title: String,
 description: String,
 create_time: Date,
 author: String,
 image: String,
 category: String
});

module.exports = mongoose.model('PostModel', PostSchema);