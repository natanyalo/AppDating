"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("process.env.MONGOOSE_URL", process.env.MONGOOSE_URL);
(0, _mongoose.connect)(_config.url);

exports.default = _mongoose2.default;