"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const message_1 = require("./message");
exports.ChetSchema = new mongoose_1.Schema({
    user1: {
        ref: "Profile",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    user2: {
        ref: "Profile",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    messages: [message_1.MessageSchema],
});
exports.ChetSchema.method('toJSON', function () {
    return {
        id: this._id,
        user1: this.user1,
        user: this.user2,
        messages: this.messages || []
    };
});
exports.Chet = mongoose_1.model("Chet", exports.ChetSchema);
//# sourceMappingURL=chet.js.map