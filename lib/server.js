'use strict';

var path = require('path');
var koa = require('koa');
var logger = require('koa-logger');
var router = require('koa-router');
var nunjucks = require('nunjucks');
var request = require('co-request');

var viewPath = path.join(__dirname, 'view');
var API = 'http://image.baidu.com/channel?c=%E7%BE%8E%E5%A5%B3#%E7%BE%8E%E5%A5%B3';

nunjucks.configure(viewPath, {
  autoescape: true
});

exports.start = function() {
  var app = koa();

  app.use(router(app));

  app.use(logger());

  app.get('/', function *(next) {
    var result = yield request(API);

    console.log(result);
    this.body = nunjucks.render('./wall.html', {
      list: ['http://d.hiphotos.baidu.com/image/w%3D310/sign=08caafe14f36acaf59e090fd4cd88d03/5fdf8db1cb134954ca0604bc524e9258d0094aca.jpg', 'http://d.hiphotos.baidu.com/image/w%3D310/sign=08caafe14f36acaf59e090fd4cd88d03/5fdf8db1cb134954ca0604bc524e9258d0094aca.jpg', 'http://d.hiphotos.baidu.com/image/w%3D310/sign=08caafe14f36acaf59e090fd4cd88d03/5fdf8db1cb134954ca0604bc524e9258d0094aca.jpg','http://d.hiphotos.baidu.com/image/w%3D310/sign=08caafe14f36acaf59e090fd4cd88d03/5fdf8db1cb134954ca0604bc524e9258d0094aca.jpg', 'http://d.hiphotos.baidu.com/image/w%3D310/sign=08caafe14f36acaf59e090fd4cd88d03/5fdf8db1cb134954ca0604bc524e9258d0094aca.jpg', 'http://d.hiphotos.baidu.com/image/w%3D310/sign=08caafe14f36acaf59e090fd4cd88d03/5fdf8db1cb134954ca0604bc524e9258d0094aca.jpg']
    });
  });

  app.listen(8080);
  console.log('starting at 8080...');
};
