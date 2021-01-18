const express = require('express');

const router = express.Router();

const uuid = require('uuid');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const checkAuthentication = require('../common/authentication')

const mail = require('../common/mail');

const AccountModel = require('../model/AccountModel');

router.post('/login', async (req, res) => {
 let username = req.body.username;
 let password = req.body.password;

 let account = await AccountModel.findOne({username: username});
 
 if (!account) {
  res.json({
   responseCode: 400,
   message: 'Account exits'
  })
 } else {
  let validPassWord = await bcrypt.compare(password, account.password);
  
  if (!validPassWord) {
   res.json({
   responseCode: 500,
   message: 'Password not valid'
  })
  } else {
   let accessToken = jwt.sign({id: account.id,username: account.username, },process.env.ACCESS_TOKEN_SECRET);
   res.json({
    id: account.id,
    username: account.username,
    name: account.name,
    email: account.email,
    phone: account.phone,
    status: account.status,
    userType: account.userType,
    verifyEmail: account.verifyEmail,
    token: accessToken
   });

   res.setHeader('Authorization', accessToken).send(accessToken);
  }
 }
});

router.post('/register', async (req, res) => {

 let username = req.body.username;
 let password = req.body.password;
 let name = req.body.name;
 let email = req.body.email;
 let phone = req.body.phone;
 let userType = req.body.userType;

let salt = await bcrypt.genSalt(10);
let hashPassword = await bcrypt.hash(password, salt);

const Account = new AccountModel({
  id: uuid.v4(),
  username: username,
  password: hashPassword,
  name: name,
  email: email,
  phone: phone,
  status: 2,
  userType: userType,
  verifyEmail: Math.floor(100000 + Math.random() * 900000)
 })

 let account = await AccountModel.findOne({username: username});
 
 if (account) {
  res.json({'message': 'Account exist'});
 } else {
  Account.save(function(err, result) {
  if (result) {
   let accessToken = jwt.sign({id: result.id,username: result.username, },process.env.ACCESS_TOKEN_SECRET);
   res.json({
    id: result.id,
    username: result.username,
    name: result.name,
    email: result.email,
    phone: result.phone,
    status: result.status,
    verifyEmail: result.verifyEmail,
    userType: result.userType,
    token: accessToken
   });

   
  mail.sendMail(email, 'Xác thực tài khoản', '<p>Mã xác thực tài khoản của bạn là ' + result.verifyEmail + '</p>');
  } else {
   res.json({'message': err})
  }
 });
 }

})

router.post('/verifyotp', async (req, res) => {
  let otp = req.body.otp;
  let userId = req.body.userId;

  let user = await AccountModel.findOne({id: userId});

  if (user) {
    if (otp === user.verifyEmail) {
      
      AccountModel.findOneAndUpdate({id: userId}, {$set:{status: 1}}).exec((err, account) => {
        if (account) {
          let accessToken = jwt.sign({id: account.id,username: account.username, },process.env.ACCESS_TOKEN_SECRET);    
           res.json({
            id: account.id,
            username: account.username,
            name: account.name,
            email: account.email,
            phone: account.phone,
            status: 1,
            verifyEmail: account.verifyEmail,
            userType: account.userType,
            token: accessToken
           });
        }
      })

     
    } else {
      res.json({
        responseCode: 500,
        message: 'Mã xác thực không chính xác'
      })
    }
  } else {
    res.json({
        responseCode: 500,
        message: 'Tài khoản không tồn tại'
      })
  }
  
})

router.get('/accounts', checkAuthentication, (req, res) => {
 res.json({
  message: 'ok'
 })
})

module.exports = router;