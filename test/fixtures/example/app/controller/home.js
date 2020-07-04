'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('home.tpl', { name: 'yadan' });
  }

  async detail() {
    const { ctx } = this;
    const name = ctx.params.name;
    const { data: userInfo } = await ctx.rpc.user.getDetail(name);
    await ctx.render('home.tpl', userInfo);
  }
}

module.exports = HomeController;
