"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.FriendSechma = new mongoose_1.Schema({
    creator: {
        ref: "User",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    match: { type: [String] },
    want: [String],
});
exports.default = mongoose_1.model("Friend", exports.FriendSechma);
//# sourceMappingURL=friend.js.map