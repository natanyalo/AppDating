"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("../models/profile");
function saveProfile(req, res) {
    const url = req.protocol + "://" + req.get("host");
    const newProfile = new profile_1.Profile({
        age: req.body.age,
        city: req.body.city,
        creator: req.userData.userId,
        imagePath: url + "/images/" + req.file.filename,
        firstName: req.body.firstName,
        favorite: req.body.favorite,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        minimum: req.body.minimum,
        maximum: req.body.maximum,
        range: req.body.range,
        summery: req.body.summery,
    });
    newProfile.save().then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).json({ messege: "create profile is fail" });
    });
}
exports.saveProfile = saveProfile;
function upDateProfile(req, res) {
    const url = req.protocol + "://" + req.get("host");
    const newProfile = new profile_1.Profile({
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
        creator: req.userData.userId,
    });
    profile_1.Profile.updateOne({ _id: req.body.id, creator: req.userData.userId }, newProfile)
        .then((result) => {
        if (result.nModified > 0) {
            res.status(200).json({});
        }
        else {
            res.status(400).json({ messege: "updata profile is fail" });
        }
    });
}
exports.upDateProfile = upDateProfile;
function getProfile(req, res) {
    const id = req.userData.userId;
    profile_1.Profile.findOne({ creator: id }, function (err, profile) {
        if (err) {
            res.status(400).json({ messege: "cant find a profile" });
        }
        else {
            res.status(200).json({ profile });
        }
    });
}
exports.getProfile = getProfile;
//# sourceMappingURL=profile.js.map