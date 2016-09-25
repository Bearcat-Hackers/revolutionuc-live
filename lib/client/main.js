'use strict';

const world = require('./hello/world');
const DynamicCSS = require('./dynamicCSS');

world();

const d = new DynamicCSS(22, 8);
