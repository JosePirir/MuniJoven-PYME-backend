'use strict'

var express = require('express'); /*requiere el modulo de express*/
var cors = require('cors'); //evitar problemas con el acceso CORS en NodeJS y nos fallen las peticiones.
var bodyParser = require('body-parser');
var userRoutes = require('./routes/user.route');
//const productRoutes = require('./routes/product.route');

var app = express(); /*se crea el objeto de nuestra aplicación*/

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);

module.exports = app;