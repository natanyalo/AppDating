'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _checkAuth = require('../middleware/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _file = require('../middleware/file');

var _file2 = _interopRequireDefault(_file);

var _profile = require('../controllers/profile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// function call without () is mean ref to function

//const multer= require('multer')
router.post("", _checkAuth2.default, _file2.default, _profile.saveProfile);
router.put("", _checkAuth2.default, _file2.default, _profile.upDataProfile);
router.get("", _checkAuth2.default, _profile.getProfile);

exports.default = router;