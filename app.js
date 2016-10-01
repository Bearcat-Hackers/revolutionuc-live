'use strict';

require('dotenv').config();

const express  = require('express');
const expressValidator = require('express-validator');
const path     = require('path');
const favicon  = require('serve-favicon');
const logger   = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'lib', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({
 customValidators: {
    notificationKeyValid: function(candidate, realKey) {
        return candidate === realKey;
    }
 }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Controllers
const pages = require('./lib/controllers/pages');
const notificationApi = require('./lib/controllers/api/v1/notification');

// Routes
app.get('/', pages.index);
app.get('/schedule', pages.schedule);
app.get('/sponsors', pages.sponsors);
app.get('/notifications', pages.notifications);
app.get('/talks', pages.techtalks);

// Notification api
app.post('/api/v1/notification/publish', notificationApi.publish);
app.post('/api/v1/notification/subscribe', notificationApi.subscribe);

// TODO: Secure or remove diagnostic endpoints:
app.get('/api/v1/notification/credentials', notificationApi.credentials);
app.get('/api/v1/notification/clearCredentials', notificationApi.clearCredentials);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
