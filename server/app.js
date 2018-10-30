require('rootpath')();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const app = express();
const cors = require('cors');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
// app.use(jwt());
app.use(errorHandler);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./users/user.controller'));
app.use('/api/current', require('./routes/current'));
app.use('/api/models', require('./routes/models'));

module.exports = app;
// https://github.com/cornflourblue/node-jwt-authentication-api
