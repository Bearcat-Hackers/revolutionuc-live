'use strict';

const DynamicCSS = require('./DynamicCSS');
const NotificationController = require('./NotificationController');
const notificationController = new NotificationController();

const dynamic = new DynamicCSS();
dynamic.watch();
