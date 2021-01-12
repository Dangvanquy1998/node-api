const express = require('express');

const router = express.Router();

const uuid = require('uuid');

const checkAuthentication = require('../common/authentication');

const CategoryModel = require('../model/CategoryModel');

router.get('/findAllCategory', checkAuthentication, (req, res) => {
    CategoryModel.find({}).exec((err, categories) => {
        if (categories) {
            res.json({
                responseCode: 200,
                message: 'Truy vấn danh sách danh mục thành công',
                data: categories
            })
        } else {
            res.json({
                responseCode: 200,
                message: 'Không tồn tại dữ liệu',
                data: null
            })
        }
    })
})

router.post('/addCategory', checkAuthentication, (req, res) => {
    let name = req.body.name;

    let Category = new CategoryModel({
        id: uuid.v4(),
        name: name
    })

    Category.save(function(err, result) {
        if (result) {
            res.json({
                responseCode: 200,
                message: 'Thêm danh mục thành công',
                data: result
            })
        } else {
            res.json({
                responseCode: 200,
                message: 'Thêm danh mục không thành công',
                data: null
            })
        }
    })
})

module.exports = router;