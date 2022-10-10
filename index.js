'use strict'

const mongoose = require('mongoose');
const userController = require('./controllers/user.controller');
const app = require('./app');
const port = process.env.PORT || 3200;
//332ebee62a45180d8a2017e367b6dd826cb5bb65
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://josepirir:55835439romero@cluster0.otmlw8j.mongodb.net', {useNewUrlParser: true})
    .then(()=>{
    console.log('Conectado a la base de Datos :D');
    userController.createAdmin();
    app.listen(port, ()=>{
        console.log('servidor de express funcionando :D ', port);
    })
})
.catch((err)=>{console.log('Error al tratar de contectarse a la base de datos', err)});