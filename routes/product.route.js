'use strict'

const express = require('express');
const productController = require('../controllers/product.controller');
const mdAuth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/saveProduct', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], productController.saveProduct);
api.put('/editProduct/:id', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], productController.editProduct);
api.delete('/deleteProduct/:id', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], productController.deleteProduct);
api.get('/getProducts', productController.getProducts);
api.put('/notAvailable/:id', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], productController.notAvailable);

module.exports = api;