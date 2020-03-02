"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const friend_1 = require("../models/friend");
const profile_1 = require("../models/profile");
const enum_1 = require("../models/enum");
const factoryObj_1 = require("../models/fcatory/factoryObj");
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userProfile = yield profile_1.Profile.findOne({ creator: req.userData.userId });
        if (!userProfile)
            res.status(200).json({ users: [] });
        const conditions = {
            gender: userProfile.favorite === enum_1.EnumGender.Male.toLowerCase(),
            maximum: {
                $gte: userProfile.minimum
            },
            minimum: {
                $lte: userProfile.maximum
            }
        };
        profile_1.Profile.find(conditions)
            .then((profiles) => {
            console.log(profiles.length);
            return res.status(200).json({
                users: profiles
                    .filter(profile => {
                    const coordinates1 = userProfile.address.coordinates;
                    const coordinates2 = profile.address.coordinates;
                    if (distance(coordinates1.lon, coordinates1.lat, coordinates2.lon, coordinates2.lat) <= userProfile.range) {
                        return profile;
                    }
                })
            });
        }).
            catch(e => {
            res.status(400).json({ messege: e });
        });
    });
}
exports.getUsers = getUsers;
function addWant(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let creator = yield friend_1.Friend.findOne({ creator: req.body.creatorId });
            if (creator === null) {
                creator = yield createFriendObj(req);
                if (creator === null)
                    throw "adding a friend failed";
            }
            let creatorFriend = {};
            creatorFriend = yield friend_1.Friend.findOne({ want: req.body.creatorId });
            console.log("dd", creatorFriend);
            if (creatorFriend !== null) {
                creatorFriend.want = yield Promise.all(creatorFriend.want.map((id) => __awaiter(this, void 0, void 0, function* () {
                    console.log("aa");
                    if (id === req.body.creatorId) {
                        console.log("oooo");
                        let notificationFactory = factoryObj_1.FactoryObj.getInstanceFactory();
                        console.log("oooo");
                        yield notificationFactory.createObj(enum_1.EnumNotification.Match, {
                            from: id, to: req.body.wantId
                        });
                        creatorFriend.match.push(req.body.creatorId);
                        creator.match.push(req.body.wantId);
                        const index = creator.want.indexOf(req.body.wantId);
                        console.log("oooo");
                        if (index !== -1)
                            creator.want.splice(index, 1);
                        return null;
                    }
                    else {
                        return id;
                    }
                })).filter((i) => i !== null));
            }
            console.log("dd");
            if ((yield creator.save()) === null)
                throw "adding a friend failed";
            if (creatorFriend !== null && (yield creatorFriend.save()) === null)
                throw "adding a friend failed";
            res.status(200).json({});
        }
        catch (message) {
            res.status(400).json({ message });
        }
    });
}
exports.addWant = addWant;
//------------private--------------------------------------------
function createFriendObj(req) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const friends = new friend_1.Friend({
            creator: req.userData.userId,
            match: [],
            want: [req.body.wantId],
        });
        const result = yield friends.save();
        return result;
    });
}
function distance(lat1, lon1, lat2, lon2, unit = 'k') {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        console.log(dist);
        return dist;
    }
}
//# sourceMappingURL=homeCenter.js.map