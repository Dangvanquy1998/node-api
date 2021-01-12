const mongoose = require('mongoose');

const AccountSchem = mongoose.Schema({
 id: String,
 username: String,
 password: String,
 name: String,
 email: String,
 phone: String,
 status: String,
 verifyEmail: String, //1.active 2.approve,
 userType: String // 1.admin 2.customer
});

module.exports = mongoose.model('AccountModel', AccountSchem);