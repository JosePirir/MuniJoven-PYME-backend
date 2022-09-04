'use strict'

const User = require('../models/user.model');
const path = require('path');
const jwt = require('../services/jwt');
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');

function createAdmin()
{
    let user = new User();
    User.findOne({username: 'admin'}, (err, found)=>{
        if(err)
        {
            console.log('Error al crear el administrador', err);
        }
        else if(found)
        {
            console.log('Administrador ya creado');
        }
        else
        {
            user.password = 'grupo#1';
            user.role = 'admin';
            bcrypt.hash(user.password, null, null, (err,passwordHash)=>{
                if(err)
                {
                    console.log('Error al encriptar la contraseña');
                }
                else if (passwordHash)
                {
                    user.username = 'admin';
                    user.password = passwordHash;

                    user.save((err, userSaved)=>{
                        if(err)
                        {
                            console.log('Error general al crear usuario administrador', err);
                        }
                        else if(userSaved)
                        {
                            console.log('Usuario administrador creado con exito', userSaved);
                        }
                        else
                        {
                            console.log('No se creo el usuario administrador');
                        }
                    })
                }
                else
                {
                    console.log('Error al encriptar la contraseña', err);
                }
            })
        }
    })
}

function saveUser(req, res)
{
    let user = new User();
    let params = req.body;
    
    if('admin' != req.user.role)
    {
        res.status(403).send({message: 'no tienes permiso de acceder a esta ruta'});
    }
    else
    {
        if(params.name && params.lastname && params.username && params.password && params.role)
        {
            User.findOne({username: params.username}, (err, userFind)=>{
                if(err)
                {
                    return res.status(500).send({message: 'Error general al buscar usuarios exitentes.'});
                }
                else if(userFind)
                {
                    return res.status(400).send({message: 'El usuario ya existe, prueba con otro nombre de usuario.'});                   
                }
                else
                {
                    bcrypt.hash(params.password, null, null, (err, passwordHash)=>{
                        if(err)
                        {
                            return res.status(500).send({message: 'Error al encriptar la contraseña'});
                        }
                        else if(passwordHash)
                        {
                            user.password = passwordHash;
                            user.name = params.name;
                            user.lastname = params.lastname;
                            user.username = params.username;

                            if(params.role == 'admin' && req.user.username != 'admin')
                            {
                                return res.status(500).send({message: 'Solo el administrador principal puede crear más administradores.'})
                            }
                            else
                            {
                                user.role = params.role;
                            }

                            user.save((err, userSaved)=>{
                                if(err)
                                {
                                    return res.status(500).send({message: 'Error al guardar el usuario'});
                                }
                                else if(userSaved)
                                {
                                    return res.status(200).send({message: 'Usuario guardado', userSaved});
                                }
                                else
                                {
                                    return res.status(500).send({message: 'No sé guardó el usuario'})
                                }
                            })
                        }
                        else
                        {
                            return res.status(503).send({message: 'Contrseña no encriptada'});
                        }
                    })
                }
            })
        }
        else
        {
            return res.status(400).send({message: 'Por favor ingrese todos los campos.'})
        }
    }
}

function login (req, res)
{
    var params = req.body;

    if(params.username && params.password)
    {
        User.findOne({username: params.username}), (err, userFind)=>{
            if(err)
            {
                return res.status(500).send({message: 'Error al encontrar usuarios'});
            }
            else if(userFind)
            {
                bcrypt.compare(params.password, userFind.password, (err, checkPassword)=>{
                    if(err)
                    {
                        return res.status(500).send({message: 'Error general en la verificación de la contraseña'});
                    }
                    else if(checkPassword)
                    {
                        if(params.gettoken)
                        {
                            delete userFind.password;
                            return res.send({ token: jwt.createToken(userFind), user:userFind});
                        }
                        else
                        {
                            return res.send({message: 'Usuario loggeado'});
                        }
                    }
                    else
                    {
                        return res.status(401).send({message: 'Contraseña incorrecta'});
                    }
                })
            }
            else
            {
                return res.send({message: 'username incorrecto'});
            }
        }
    }
    else
    {
        return res.status(401).send({message: 'Por favor ingrese los datos obligatorios'});
    }
}

module.exports = {
    createAdmin,
    saveUser,
    login
}