'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _checkAuth = require('../middleware/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _homeCenter = require('../controllers/homeCenter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const middlewarFile=require('../middleware/file')

//const multer= require('multer')
var router = (0, _express.Router)();

//next for to prevent situion that the code stack because it
//is not send back response
router.get("", _homeCenter.getUsers);
router.post("/want", _checkAuth2.default, _homeCenter.addWant);
exports.default = router;