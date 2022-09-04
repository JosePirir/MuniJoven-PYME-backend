'use strict'

const express = require('express'); /*requiere el modulo de express*/
const cors = require('cors'); //evitar problemas con el acceso CORS en NodeJS y nos fallen las peticiones.
const bodyParser = require('body-parser');

const app = express(); /*se crea el objeto de nuestra aplicación*/

app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());
app.use(cors());

module.exports = app;