'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'encrypt-grupo#1';

exports.ensureAuth = (req, res, next) =>{
    if(!req.headers.authorization)
    {
        return res.status(403).send({message: 'La petición no lleva cabecera de autenticación.'});
    }
    else
    {
        let token = req.headers.authorization.replace(/['"']+/g,'');
    }
    try
    {
        let payload = jwt.decode(token, secretKey);
        if(payload.exp <= moment().unix())
        {
            return res.status(401).send({message: 'Token ha expirado'});
        }
    }
    catch(err)
    {
        return res.status(404).send({message: 'token invalido'});
    }

    req.user = payload;
    next();
}

exports.ensureAuthAdmin = (req, res, next) =>{
    var payload = req.user;

    if(payload.role != 'admin')
    {
        return res.status(404).send({ message: 'No tienes permisos para ingresar a esta ruta (debe ser administrador)'});
    }
    else
    {
        return next();
    }
}