'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/framework.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'example',
      framework: true,
    });
    return app.ready();
  });

  after(() => app && app.close());

  afterEach(mock.restore);

  it('should support nunjucks render', async () => {
    return app.httpRequest()
      .get('/')
      .expect('<div>yadan</div>\n')
      .expect(200);
  });

  describe('rpc', () => {
    it('should load rpc', async () => {
      const ctx = app.createAnonymousContext();
      assert(ctx.rpc.user);
    });

    it('should request api', async () => {
      app.mockHttpclient('https://example.com/api/user/detail', (url, opts) => {
        return {
          data: {
            id: `${opts.data.id}`,
            name: `Mr ${opts.data.id}`,
          },
        };
      });

      const ctx = app.createAnonymousContext();

      const result = await ctx.rpc.user.getDetail('yadan');

      assert(result.success);
      assert(result.data.name === 'Mr yadan');
    });

    it('should request api with error', async () => {
      app.mockHttpclient('https://example.com/api/user/detail', () => {
        throw new Error('no auth');
      });

      const ctx = app.createAnonymousContext();

      const result = await ctx.rpc.user.getDetail('yadan');

      assert(!result.success);
      assert(result.error.message === 'no auth');
    });

    it('should support nunjucks render', async () => {
      app.mockHttpclient('https://example.com/api/user/detail', (url, opts) => {
        return {
          data: {
            id: `${opts.data.id}`,
            name: `Mr ${opts.data.id}`,
          },
        };
      });

      return app.httpRequest()
        .get('/detail/yadan')
        .expect('<div>Mr yadan</div>\n')
        .expect(200);
    });
  });

});
