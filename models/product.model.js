'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = Schema({
    name: String,
    price: Number,
    link: String,
    available: String,
    size : String,
    gender: String
});

module.exports = mongoose.model('product', productSchema);