'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _checkAuth = require('../middleware/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _post = require('../controllers/post');

var _file = require('../middleware/file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

//next for to prevent situion that the code stack because it
//is not send back response
router.get("", _post.getPosts);

router.post("", _checkAuth2.default, _file2.default, _post.createPost);

router.put("", _post.upDataPost);

router.delete("/:id", _checkAuth2.default, _file2.default, _post.deletePost);

exports.default = router;