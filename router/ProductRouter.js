const express = require('express');

const router = express.Router();

const uuid = require('uuid');

const checkAuthentication = require('../common/authentication');

const ProductModel = require('../model/ProductModel');

// Thêm mới sản phẩm
router.post('/addProduct', checkAuthentication, (req, res) => {
    let account = req.account;

    let name = req.body.name;
    let price = req.body.price;
    let category = req.body.category;
    let createTime = req.body.createTime;
    let updateTime = req.body.updateTime;
    let createBy = account.id;
    let quantity = req.body.quantity;

    const Product = new ProductModel({
        id: uuid.v4(),
        name: name,
        price: price,
        category: category,
        createTime: new Date(),
        updateTime: updateTime,
        createBy: createBy,
        quantity: quantity
    });

    Product.save(function(err, product) {
        if (product) {
            res.json({
                responseCode: 200,
                message: 'Thêm mới sản phẩm thành công',
                data: product
            })
        } else {
            res.json({
                responseCode: 200,
                message: 'Thêm mới sản phẩm không thành công',
                data: null
            })
        }
    })
})

// Truy vấn danh sách sản phẩm
router.get('/findAllProduct', checkAuthentication, (req, res) => {
    ProductModel.find({}).exec((err, products) => {
        if (products) {
            res.json({
                responseCode: 200,
                message: 'Truy vấn danh sách sản phẩm thành công',
                data: products
            })
        } else {
            res.json({
                responseCode: 200,
                message: 'Truy vấn danh sách sản phẩm thành công',
                data: null
            })
        }
    })
});

// Truy vấn danh sách sản phẩm theo mã danh mục
router.post('/findByCategory', checkAuthentication, (req, res) => {
    let category = req.body.category;
    ProductModel.find({category: category}).exec((err, products) => {
        if (products) {
            res.json({
                responseCode: 200,
                message: 'Truy vấn danh sách sản phẩm thành công',
                data: products
            })
        } else {
            res.json({
                responseCode: 200,
                message: 'Truy vấn danh sách sản phẩm thành công',
                data: null
            })
        }
    })
})

module.exports = router;