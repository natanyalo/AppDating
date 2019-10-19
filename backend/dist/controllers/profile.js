'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveProfile = saveProfile;
exports.upDataProfile = upDataProfile;
exports.getProfile = getProfile;

var _profile = require('../models/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveProfile(req, res, next) {

    var url = req.protocol + '://' + req.get("host");
    console.log(req.body);
    newProfile = new _profile2.default({
        phoneNumber: req.body.phoneNumber,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        favorite: req.body.favorite,
        age: req.body.age,
        minimum: req.body.minimum,
        maximum: req.body.maximum,
        range: req.body.range,
        summery: req.body.summery,
        city: req.body.city,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });

    newProfile.save().then(function (result) {
        res.status(200).json(newProfile);
    }).catch(function (e) {
        res.status(400).json({ messege: "create profile is fail" });
    });
}

function upDataProfile(req, res, next) {
    console.log("aa", req.body);
    console.log(req.get("host"));
    var url = req.protocol + '://' + req.get("host");
    newProfile = new _profile2.default({
        phoneNumber: req.body.phoneNumber,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        favorite: req.body.favorite,
        age: req.body.age,
        minimum: req.body.minimum,
        maximum: req.body.maximum,
        range: req.body.range,
        summery: req.body.summery,
        city: req.body.city,
        _id: req.body.id,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });

    (0, _profile.updateOne)({ _id: req.body.id, creator: req.userData.userId }, newProfile).then(function (result) {
        if (result.nModified > 0) res.status(200).json({});else res.status(400).json({ messege: "updata profile is fail" });
    });
}

function getProfile(req, res, next) {
    var id = req.userData.userId;

    (0, _profile.findOne)({ creator: id }, function (err, pro) {
        if (err) res.status(400).json({ messege: "cant find a profile" });else {
            console.log("fffffffffffffff", pro);
            res.status(200).json(pro);
        }
    });
}