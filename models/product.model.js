'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = Schema({
    name: String,
    price: Number,
    image1: String,
    image2: String,
    image3: String,
    available: String,
    descripcion: String,
    size : String,
    brand: String,
    gender: String
});

module.exports = mongoose.model('product', productSchema);