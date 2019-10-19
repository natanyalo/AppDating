"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require("mongoose");

var userSechma = (0, _mongoose.Schema)({
   email: { type: String, unique: true, require: true },
   password: { type: String, require: true },
   lastName: { type: String, require: true },
   firstName: { type: String, require: true }

});

exports.default = (0, _mongoose.model)('User', userSechma);