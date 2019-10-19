'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userSignUp = userSignUp;
exports.userLogin = userLogin;

var _bcrypt = require('bcrypt');

var _jsonwebtoken = require('jsonwebtoken');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function userSignUp(req, res, next) {
    (0, _bcrypt.hash)(req.body.password, 10).then(function (hash) {
        var user = new _user2.default({
            email: req.body.email,
            password: hash,
            lastName: req.body.lastname,
            firstName: req.body.firstname

        });

        user.save().then(function (result) {
            var token = (0, _jsonwebtoken.sign)({
                email: result.email,
                userId: result._id
            }, process.env.JWT_TOKEN, { expiresIn: "1h" });
            res.status(200).json({
                token: token, timer: "3000",
                userId: result._id
            });
        }).catch(function (error) {
            res.status(400).json({ error: error });
        });
    });
}

function userLogin(req, res, next) {

    var userfatch = void 0;
    (0, _user.findOne)({ email: req.body.email }).then(function (user) {
        //condition for find user

        if (!user) return res.status(401).json({
            messege: "auth faild"
        });

        userfatch = user;
        return (0, _bcrypt.compare)(req.body.password, user.password);
    }).then(function (result) {
        if (!result) return res.status(401).json({
            messege: "auth failed"
        });
        console.log("process.env.JWT_TOKEN", process.env.JWT_TOKEN);
        var token = (0, _jsonwebtoken.sign)({
            email: userfatch.email,
            userId: userfatch._id
        }, process.env.JWT_TOKEN, { expiresIn: "1h" });

        res.status(200).json({
            token: token, timer: "3000",
            userId: userfatch._id
        });
    }).catch(function (error) {
        return res.status(401).json({
            messege: " auth failed"
        });
    });
}