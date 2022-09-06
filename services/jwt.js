'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'encrypt-Grupo1';

exports.createToken = (user)=>{
    var payload = {
        sub: user._id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(8, 'hours').unix()
    }
    return jwt.encode(payload, secretKey);
}