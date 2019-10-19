"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require("mongoose");

var friendSechma = (0, _mongoose.Schema)({
   match: { type: [String] },
   want: [String],
   creator: { type: _mongoose.Schema.Types.ObjectId, ref: "User",
      require: true }

});

exports.default = (0, _mongoose.model)('friends', friendSechma);