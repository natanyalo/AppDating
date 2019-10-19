'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _path = require('path');

var _mongoose = require('mongoose');

var _config = require('./models/config');

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _profile = require('./routes/profile');

var _profile2 = _interopRequireDefault(_profile);

var _homeCenter = require('./routes/homeCenter');

var _homeCenter2 = _interopRequireDefault(_homeCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
//app.use(cors())


(0, _mongoose.connect)(_config.url, {
  userNewUrlParser: true,
  userCreateIndex: true
});

app.use((0, _bodyParser.urlencoded)({ extended: true }));
app.use((0, _bodyParser.json)());
//allow to access to file , and tha path is for 
// rediraction to right path from "images" to "backend/images" 
app.use("/images", _express2.default.static((0, _path.join)("images")));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE,PUT, OPTIONS");
  next();
});

app.use("/api/post", _posts2.default);
app.use("/api/center", _homeCenter2.default);
app.use("/api/user", _user2.default);
app.use("/api/profile", _profile2.default);

exports.default = app;