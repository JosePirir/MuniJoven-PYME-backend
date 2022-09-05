'use strict'

var express = require('express');
var userController = require('../controllers/user.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/login', userController.login);
api.post('/saveUser', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.saveUser);
//api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUsers);
api.get('/getUsers', userController.getUsers);
api.get('/test', userController.test);

module.exports = api;