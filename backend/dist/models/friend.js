"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FriendSechma = new mongoose_1.Schema({
    creator: {
        ref: "User",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    match: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    want: [String],
});
const Friend = mongoose_1.model("Friend", FriendSechma);
exports.Friend = Friend;
//# sourceMappingURL=friend.js.map