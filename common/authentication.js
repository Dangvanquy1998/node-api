
const debug = console.log.bind(console);

const jwt = require('jsonwebtoken');

let isAuth = function (req, res, next) {
    let token = req.header('Authorization');
    
    debug(token);
    if (!token) {
     res.json({
      responseCode: 401,
      message: 'Not login'
     })
    } else {
     try {
      let verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.account = verify;
      next();
     } catch (err) {
      res.json({
      responseCode: 500,
      message: 'Invalid token'
     })
     }
    }
   }

module.exports = isAuth;