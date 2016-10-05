'use strict';

require('dotenv').config();

const util = require('util');
const fs = require('fs');
const path = require('path');
const webPush = require('web-push');

webPush.setGCMAPIKey(process.env.GCM_API_KEY);

const NOTIFICATION_KEY = process.env.NOTIFICATIONS_KEY;

let storedPushCredentials = [];

/* TODO: SECURE DIAGNOSTIC ENDPOINT BEFORE HACKATHON */

exports.credentials = function(req, res) {
  res.json(storedPushCredentials);
}

exports.clearCredentials = function(req, res) {
  storedPushCredentials = [];
  res.json(storedPushCredentials);
}

/**
 * Publishes a notification
 */
exports.publish = function(req, res) {
    req.checkBody('apikey', 'API Key must not be empty').notEmpty();
    req.checkBody('apikey', 'API Key is incorrect').notificationKeyValid(NOTIFICATION_KEY);
    req.checkBody('text', 'Payload must not be empty').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        res.status(400).send('There have been validation errors: ' + util.inspect(errors));
        return;
    }

  const pushPayload = {
    text: req.body.text || "Static server notification payload...",
    icon: req.body.icon || 'https://' + req.get('host') + '/apple-touch-icon.png'
  }

  storedPushCredentials.forEach(function(pushCredentials, i) {

    webPush.sendNotification(pushCredentials, JSON.stringify(pushPayload))
    .then(function() {
      console.log("Push notification sent successfully");
    }).catch(function(error) {
      console.log(error);
    });

  }); //end forEach

  res.sendStatus(201);
};

/**
 * Subscribes a client to notifications
 */
exports.subscribe = function(req, res) {
  const newPushCredentials = {
    endpoint: req.body.endpoint,
    keys: {
      p256dh: req.body.p256dh,
      auth: req.body.auth
    }
  };

   const found = storedPushCredentials.some(function (element) {
    return element.endpoint === newPushCredentials.endpoint;
  });

  if (!found) {
    console.log("Pushing");
    storedPushCredentials.push(newPushCredentials);
  }

  res.sendStatus(200);
};
