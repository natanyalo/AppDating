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
function getFriends(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const listFriend = yield friend_1.Friend.findOne({ creator: req.userData.userId });
        const match = yield profile_1.Profile.find({ creator: { $in: listFriend.match } });
        res.status(200).json({ friends: listFriend ? match : [] });
    });
}
exports.getFriends = getFriends;
//# sourceMappingURL=friend.js.map