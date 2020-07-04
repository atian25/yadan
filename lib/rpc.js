'use strict';

class RPC {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.logger = ctx.logger;
    this.config = ctx.app.config;
  }

  async api(apiName, data) {
    const host = this.config.rpc.host;

    try {
      const targetUrl = `${host}/api${apiName}`;
      this.logger.info(`[RPC] request api: ${targetUrl}`);

      const res = await this.ctx.curl(targetUrl, {
        dataType: 'json',
        contentType: 'json',
        timeout: 5000,
        data,
      });

      return this.handlerResult(res, { apiName, data });

    } catch (err) {
      return this.handlerError(err, { apiName, data });
    }
  }

  handlerResult(res) {
    return {
      success: true,
      data: res.data,
    };
  }

  handlerError(err, meta) {
    this.logger.error(`[RPC] request ${meta.apiName} fail: ${err.message}`);
    return {
      success: false,
      error: {
        message: err.message,
      },
    };
  }
}

module.exports = RPC;
