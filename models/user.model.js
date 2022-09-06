'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    role: String
});

module.exports = mongoose.model('user', userSchema);