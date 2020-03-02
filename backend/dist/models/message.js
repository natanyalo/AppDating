"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    user: {
        ref: "Profile",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    message: {
        type: String,
        required: true
    },
});
exports.MessageSchema.method('toJSON', function () {
    return {
        id: this._id,
        user: this.user,
        message: this.message,
        createdAt: this.createdAt
    };
});
exports.Message = mongoose_1.model("Message", exports.MessageSchema);
//# sourceMappingURL=message.js.map