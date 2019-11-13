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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const friend_1 = __importDefault(require("../models/friend"));
const profile_1 = require("../models/profile");
function getUsers(req, res, next) {
    profile_1.Profile.find(function (err, profiles) {
        if (err) {
            res.status(400).json({ messege: "cant find profiles" });
        }
        else {
            res.status(200).json({ users: profiles });
        }
    });
}
exports.getUsers = getUsers;
function createfriend(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const friends = new friend_1.default({
            creator: req.userData.userId,
            match: [],
            want: [req.body.wantId],
        });
        const result = yield friends.save();
        return result;
    });
}
function addWant(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield friend_1.default.findOne({ creator: req.body.creatorId });
            if (result === null) {
                result = yield createfriend(req);
                if (result === null) {
                    throw new Error("add friend is fail");
                }
            }
            let listFriends = {};
            yield friend_1.default.findOne({ want: req.body.creatorId }, function (err, item) {
                if (err) {
                    throw new Error("add friend is fail");
                }
                listFriends = item;
            });
            if (listFriends && result !== null) {
                listFriends.want = listFriends.want.map((id) => {
                    if (id === req.body.creatorId) {
                        result.match.push(req.body.wantId);
                        listFriends.match.push(req.body.creatorId);
                        return null;
                    }
                    else {
                        return id;
                    }
                }).filter((i) => i !== null);
                const index = result.want.indexOf(req.body.wantId);
                if (index !== -1) {
                    result.want.splice(index, 1);
                }
                result.save((err, item) => {
                    if (err) {
                        throw new Error("add friend is fail");
                    }
                });
                listFriends.save((err, item) => {
                    if (err) {
                        throw new Error("add friend is fail");
                    }
                });
                res.status(200).json({});
            }
            else {
                res.status(200).json(result);
            }
        }
        catch (message) {
            res.status(400).json({ message });
        }
    });
}
exports.addWant = addWant;
//# sourceMappingURL=homeCenter.js.map