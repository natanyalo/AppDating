"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require("mongoose");

var userSechma = (0, _mongoose.Schema)({
   phoneNumber: { type: Number, require: true },
   lastName: { type: String, require: true },
   firstName: { type: String, require: true },
   favorite: { type: String, require: true },
   minimum: { type: String, require: true },
   age: { type: String, require: true },
   maximum: { type: String, require: true },
   range: { type: Number, require: true },
   summery: { type: String, require: true },
   city: { type: String, require: true },
   imagePath: { type: String, require: true },
   creator: {
      type: _mongoose.Schema.Types.ObjectId, ref: "User",
      require: true
   }
});

exports.default = (0, _mongoose.model)('Profile', userSechma);