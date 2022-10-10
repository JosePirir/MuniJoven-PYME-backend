'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = Schema({
    name: String,
    descripcion: String,
    brand: String,
    size : String,
    price: Number,
    available: String,
    gender: String,
    image1: String,
    image2: String,
    image3: String
});

module.exports = mongoose.model('product', productSchema);