const express = require('express');
//lets abstract routes out of index.js server file
const router = express.Router();
const {signup} = require('../handlers/auth');

router.post('/signup', signup);

module.exports = router;