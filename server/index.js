'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./handlers/error');

const PORT = 3000;


//some cors middleware
app.use(cors());
// for api purposes dont use urlencoded
app.use(bodyParser.json());
// using morgan for easier debugging
app.use(morgan('common'));

//all routes here eventually 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//if routes above are not reached run function as middleware
// 404 what happens when route is not found runs helper function
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//if error is still not resolved passed to handler below
app.use(errorHandler);


app.listen(PORT, () => console.log(`api running on port ${PORT}`));
