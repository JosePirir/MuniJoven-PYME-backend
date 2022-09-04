'use strict'

const express = require('express');
const userController = require('../controllers/user.controller');
const mdAuth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/saveUser', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.saveUser);
api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUsers);
api.post('/login', userController.login);

module.exports = api;