'use strict';

const mock = require('egg-mock');

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
});

