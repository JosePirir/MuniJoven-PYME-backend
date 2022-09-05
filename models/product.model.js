'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = Schema({
    name: String,
    price: String,
    link: String,
    available: Boolean,
    size : String,
    gender: String
});

module.exports = mongoose.model('product', productSchema);