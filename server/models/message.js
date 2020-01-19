'use strict';

//wrapper for mongo better usage
const mongoose = require('mongoose');
//be able to see mongo query in terminal
mongoose.set('debug', true);
//espicifi which promise library you are going to use
mongoose.Promise = Promise;

//connect to db, options included
mongoose.connect('mongodb://localhost/twitter-clone', {
    keepAlive: true, 
    useMongoClient: true
});