'use strict';

const DynamicCSS = require('./dynamicCSS');
const NotificationController = require('./NotificationController');
const notificationController = new NotificationController();

const dynamic = new DynamicCSS();
dynamic.watch();
