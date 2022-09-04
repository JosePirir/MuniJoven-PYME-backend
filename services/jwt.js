'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = 'encrypt-grupo#1'

exports.createToken = (user) =>{
    var payload = {
        sub: user._id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(6, 'hours').unix()
    }
    return jwt.encode(payload, secretKey);
}