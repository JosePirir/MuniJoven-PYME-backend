'use strict'

const mongoose = require('mongoose');
const port = 3200;
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pyme', {useNewUrlParser:true}).then(()=>{
    console.log('Conectado a la base de Datos :D');
    app.listen(port, ()=>{
        console.log('servidor de express funcionando :D');
    })
})
.catch((err)=>{console.log('Error al tratar de contectarse a la base de datos', err)});

