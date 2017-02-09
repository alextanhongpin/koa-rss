'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaEjs = require('koa-ejs');

var _koaEjs2 = _interopRequireDefault(_koaEjs);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _errors = require('./modules/errors.js');

var _errors2 = _interopRequireDefault(_errors);

var _transport = require('./rss-service/transport');

var _transport2 = _interopRequireDefault(_transport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PORT = process.env.PORT;
var app = new _koa2.default();

app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '..', 'public')));

(0, _koaEjs2.default)(app, {
  root: _path2.default.join(__dirname, '..', 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.context.render = _co2.default.wrap(app.context.render);

app.use((0, _errors2.default)())
// .use(logger())
.use((0, _koaBodyparser2.default)());

// Catch-All Route
app.use(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ctx.render('index', {
              title: 'Hello'
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// save the client side primus code so its available
// to the html page
var server = (0, _transport2.default)(_http2.default.createServer(app.callback()));

server.listen(PORT, function () {
  console.log('listening to port *:' + PORT + '.\npress ctrl + c to cancel.');
});

exports.default = app;