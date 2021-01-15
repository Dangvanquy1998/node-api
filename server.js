const express = require('express');

const http = require('http');

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

require('dotenv').config();


const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (!err) {
        console.log('Connect mongoose db ok');
    } else {
        console.log('Connect mongoose db error');
    }
});

const AccountRouter = require('./router/AccountRouter.js');
const CategoryRouter = require('./router/CategoryRouter');
const ProductRouter = require('./router/ProductRouter');

app.use('/account', AccountRouter);

app.use('/category', CategoryRouter);

app.use('/product', ProductRouter);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

