const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');
// get method 
router.get('/', (req, res, next) => {
    Product.find().exec().then(docs => {
        console.log(docs);
        if(docs.length >= 0) {
            res.status(200).json("There is a data", docs);
        } else {
            res.status(500).json({
                message: 'No entries Found'
            });
        }
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
// post method
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "handling POST requests to /products",
            createdProduct: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});
// get product id 
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc) {
                res.status(200).json(doc);
            } else {
                res.status(200).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});
// path updated
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    });
});

router.delete('/:productId', (req, res, next) => {
    const id =req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json(err);
        error: err
    });
});


module.exports = router;

