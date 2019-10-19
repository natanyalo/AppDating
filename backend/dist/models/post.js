"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require("mongoose");

var postSechma = (0, _mongoose.Schema)({
   title: { type: String, require: true },
   content: String,
   imagePath: String,
   creator: { type: _mongoose.Schema.Types.ObjectId, ref: "User",
      require: true }

});

exports.default = (0, _mongoose.model)('post', postSechma);