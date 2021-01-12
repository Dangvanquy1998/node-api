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

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
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

