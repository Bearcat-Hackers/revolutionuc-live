'use strict';

import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

import './scss/main.scss';

import DynamicCSS from './DynamicCSS';
import NotificationController from './NotificationController';

const notificationController = new NotificationController();

const dynamic = new DynamicCSS();
dynamic.watch();
