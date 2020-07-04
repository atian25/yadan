'use strict';

const { RPC } = require('egg');

module.exports = class TestRPC extends RPC {
  async getDetail(id) {
    return await this.api('/user/detail', { id });
  }
};
