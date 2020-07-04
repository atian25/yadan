'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('home.tpl', { name: 'yadan' });
  }
}

module.exports = HomeController;
