require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const api = require('./routes');
const {Exception} = require('./middleware');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', api);

app.use(Exception.notFound);
app.use(Exception.errorHandler);

module.exports = app;

