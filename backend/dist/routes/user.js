'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('../controllers/user');

var router = (0, _express.Router)();

// function call without () is mean ref to function
router.post("/signup", _user.userSignUp);

router.post("/login", _user.userLogin);

exports.default = router;