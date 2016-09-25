'use strict';

require('dotenv').config();

const util = require('util');
const fs = require('fs');

/**
 * Publishes a notification
 */
exports.publish = function(req, res) {
    req.checkBody('apikey', 'Key cannot be empty').notEmpty();
    req.checkBody('payload', 'Payload cannot be empty').notEmpty();

    const errors = req.validationErrors();

    if(errors) {
        res.status(400).send('There have been validation errors: ' + util.inspect(errors));
        return;
    }

    const systemKey = process.env.NOTIFICATIONS_KEY;
    const givenKey = req.body.apikey;
    const payload = req.body.payload;
    const payloadIcon = req.protocol + '://' + req.get('host') + '/apple-touch-icon.png';

    // check keys
    if(systemKey === givenKey) {
        res.send('publishing notification: ' + payload);

        // do fancy notification stuff with the payload here

        return;
    }

    res.status(401).send('Keys do not match');
};

/**
 * Subscribes a client to notifications
 */
exports.subscribe = function(req, res) {
    // keys and stuff

    // do fancy notification stuff to subscribe the user

    res.send('it should work');
};
