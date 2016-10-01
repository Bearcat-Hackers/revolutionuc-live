'use strict';

const world = require('./hello/world');
const DynamicCSS = require('./dynamicCSS');

world();

const dynamic = new DynamicCSS();
dynamic.watch();
