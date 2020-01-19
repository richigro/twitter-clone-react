'use strict';

const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async function(req, res, next) {
    try {
        //create a user
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
        // create a token 
        // create a token sign a token
        //process.env secret_jwt
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_JWT);
         return res.status(200).json({
             id,
             username,
             profileImageUrl,
             token
         });

    } catch(err) {
        // if validation fails
        if(err.code === 11000) {
            err.message = "That username and/or email is already taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}