'use strict';

require('dotenv').config();

const util = require('util');
const fs = require('fs');
const path = require('path');
const webPush = require('web-push');

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const credentialSchema = mongoose.Schema({
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String
  }
});

const Credential = mongoose.model('Credential', credentialSchema);

webPush.setGCMAPIKey(process.env.GCM_API_KEY);

const NOTIFICATION_KEY = process.env.NOTIFICATIONS_KEY;

let storedPushCredentials = [];

/* TODO: SECURE DIAGNOSTIC ENDPOINT BEFORE HACKATHON */

exports.credentials = function(req, res) {
  Credential.find(function (err, allCredentials) {
    if (err) return console.error(err);
    res.json(allCredentials);
  });
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

  Credential.find(function (err, allCredentials) {
    if (err) return console.error(err);
    
    allCredentials.forEach(function(pushCredentials, i) {
      console.log(pushCredentials);
      webPush.sendNotification(pushCredentials, JSON.stringify(pushPayload))
      .then(function() {
        console.log("Push notification sent successfully");
      }).catch(function(error) {
        
        Credential.remove(pushCredentials, function(err, removed) {
          console.log(removed);
        });
        
        console.log(error);
      });

    }); //end forEach
  
  });

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

  console.log("Pushing");
  
  const newCredential = new Credential(newPushCredentials);
  console.log("about to save ==> ", newPushCredentials);
  newCredential.save(function (err, newCredential) {
    if (err) return console.error(err);
  });

  storedPushCredentials.push(newPushCredentials);

  res.sendStatus(200);
};
