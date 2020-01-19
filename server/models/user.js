'use strict';


const mongoose = require('mongoose');
//for password one-way hashing
const bcrypt = require('bcrypt');

//schema for user
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    profileImageUrl: {type: String}
});

//pre-hook to store password securely
// pre saving data into sever; therefore save option
userSchema.pre('save', async function(next) {
    try {
        //if password inst hashes yet then leave it alone and move on
        // to next middleware
        if(!this.isModified("password")) {
            return next();
        }
        //else hash password before saving to db
        //password hashed with salt facor of 10
        //hash is asynchronous action so await is used until promise resolves
        let hashedPassword = await bcrypt.hash(this.password, 10);
        //after hash function is resolved, changed password to hash password
        this.password = hashedPassword;
        return next();
    
    } catch(err){
        //pass an error to next so that is hanndled by error handler
        return next(err);
    }
}) ;

// document specific method
userSchema.method.comparePaswword = async function(somePassword, next) {
    try {
        // this will return true or false after promise resolves
        let isMatch  = await bcrypt.compare(somePassword, this.password);
        return isMatch;
    } catch(err) {
        return next(err);
    }
} ;


// model for user
const User = mongoose.model('User', userSchema);

module.exports = User;