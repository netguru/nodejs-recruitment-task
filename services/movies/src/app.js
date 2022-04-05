const express = require('express');
const dotenv = require('dotenv');
const mongooose = require('mongoose');
const createError = require('http-errors');
const routes = require('./movies.route');
dotenv.config();

const app = express();

mongooose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('db connected'))
    .catch((error) => console.error(error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 400);
    res.json({ error: err.message, message: 'Operation failed' });
});

module.exports = app;
