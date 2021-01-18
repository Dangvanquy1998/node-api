const express = require('express');

const router = express.Router();

const uuid = require('uuid');

const PostModel = require('../model/PostModel');

router.get('/getAllPost', (req, res) => {
 PostModel.find({}).exec((err, posts) => {
  if (posts) {
   res.json({
    responseCode: 200,
    message: 'Truy vấn danh sách bài viết thành công',
    data: posts
   })
  } else {
   res.json({
    responseCode: 200,
    message: 'Truy vấn danh sách bài viết thành công',
    data: null
   })
  }
 })
})

router.post('/getPostById', (req, res) => {
 let idPost = req.body.idPost;

 PostModel.findOne({id: idPost}).exec((err, post) => {
  if (post) {
 res.json({
    responseCode: 200,
    message: 'Truy vấn danh sách bài viết thành công',
    data: posts
   })
  } else {
    res.json({
    responseCode: 200,
    message: 'Truy vấn danh sách bài viết thành công',
    data: posts
   })
  }
 })
})

router.post('/getPostByCategory', (req, res) => {
 let idCategory = req.body.idCategory;
 let perPage = req.body.perPage;
 let page = req.body.page;

 console.log(idCategory)

 PostModel.find({category: idCategory})
 .limit(perPage)
  .skip(perPage * page)
  .sort([['create_time', -1]]).exec((err, posts) => {
  if (posts) {
   res.json({
    responseCode: 200,
    message: 'Truy vấn danh sách bài viết thành công',
    data: posts
   })
  } else {
   res.json({
    responseCode: 200,
    message: 'Truy vấn danh sách bài viết thành công',
    data: null
   })
  }
 })
})

router.post('/addPost', (req, res) => {
 let title = req.body.title;
 let description = req.body.description;

 console.log(title);
 let create_time = new Date();
 let author = req.body.author;
 let image = req.body.image;
 let category = req.body.category;

 console.log(title);
 const Post = new PostModel({
  id: uuid.v4(),
  title: title,
  description: description,
  create_time: create_time,
  author: author,
  image: image,
  category: category
 });

 Post.save(function(err, result) {
  if (result) {
   res.json({
    responseCode: 200,
    message: 'Thêm mới bài viết thành công',
    data: result
   })
  } else {
   res.json({
    responseCode: 200,
    message: 'Thêm mới bài viết không thành công',
    data: null
   })
  }
 });
})

module.exports = router;