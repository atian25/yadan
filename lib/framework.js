'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');

const RPC = require('./rpc');

class Application extends egg.Application {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }

  get RPC() {
    return RPC;
  }
}

class Agent extends egg.Agent {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }
}

module.exports = Object.assign(egg, {
  Application,
  Agent,
  RPC,
});
