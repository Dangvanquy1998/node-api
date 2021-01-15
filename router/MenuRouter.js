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
    let hasChildren = req.body.hasChildren;
    let level = req.body.level;

    let checkExistItemMenuParent = MenuModel.findOne({path: path});

    if (checkExistItemMenuParent) {
        console.log(1);
        res.json({
            responseCode: 200,
            messgage: 'Menu đã tồn tại trong hệ thống',
            data:1
        })
    } else {
        let childrenRequest = [];

        childrenRequest = req.body.children;

        let Menu = new MenuModel({
            id: uuid.v4(),
            title: title,
            path: path,
            level: level,
            hasChildren: hasChildren,
            children: childrenRequest
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
        }
    
})

module.exports = router;

