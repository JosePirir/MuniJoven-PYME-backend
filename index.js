'use strict'

const mongoose = require('mongoose');
const userController = require('./controllers/user.controller');
const app = require('./app');
const port = app.set('port', process.env.PORT || 3200);

mongoose.Promise = global.Promise;
mongoose.connect('https://terramoda-fe03b-default-rtdb.firebaseio.com/', {useNewUrlParser: true}) /*cluster atlas*/
    .then(()=>{
    console.log('Conectado a la base de Datos :D');
    userController.createAdmin();
    app.listen(port, ()=>{
        console.log('servidor de express funcionando :D ', port);
    })
})
.catch((err)=>{console.log('Error al tratar de contectarse a la base de datos', err)});