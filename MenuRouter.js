const express = require('express');

const router = express.Router();

const uuid = require('uuid');

const checkAuthentication = require('../common/authentication')

const MenuModel = require('../model/MenuModel');

router.get('/getMenu', (req, res) => {
    MenuModel.find({}).exec((err, menus) => {
        if (menus) {
            res.json({
                responseCode: 200,
                message: 'Truy vấn danh sách thành công',
                data: menus
            })
        } else {

            res.json({
                responseCode: 200,
                message: 'Truy vấn danh sách thành công',
                data: null
            })

        }
    })
})

router.post('/addMenu', checkAuthentication, (req, res) => {
    let title = req.body.title;
    let path = req.body.path;

    let Menu = new MenuModel({
        id: uuid.v4(),
        title: title,
        path: path
    })

    Menu.save((err, menuResult) => {
        if (menuResult) {
            res.json({
                responseCode: 200,
                message: 'Thêm mới menu thành công',
                data: menuResult
            })
        } else {
            res.json({
                responseCode: 200,
                message: 'Thêm mới menu không thành công',
                data: null
            })
        }
    })
})

module.exports = router;

