const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import products from Router
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//mongoose database connection
mongoose.connect(
    'mongodb://node-shop:' + 
    process.env.MONGO_ATLAS_PW + 
    '@node-rest-shop-shard-00-00-stnqc.mongodb.net:27017,node-rest-shop-shard-00-01-stnqc.mongodb.net:27017,node-rest-shop-shard-00-02-stnqc.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true')
    {
        useMongoClient: true
    }
//Dispaly status of the orders GET/orders/343553 201
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//broser request errors headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header(
        "Access-Control-Allow-headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS") {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json(({}));
    }
    next();
})

// product router api "MIDDLEWARE"
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;