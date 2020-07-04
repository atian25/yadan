'use strict';

module.exports = () => {
  const config = {};

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
      '.tpl': 'nunjucks',
    },
  };

  config.customLoader = {
    rpc: {
      directory: 'app/rpc',
      inject: 'ctx',
      loadunit: true,
    },
  };

  config.rpc = {
    host: undefined,
  };

  return config;
};
