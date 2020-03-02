"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationMessageSchema = new mongoose_1.Schema({
    from: {
        ref: "User",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId
    },
    to: {
        ref: "User",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId
    },
    read: { type: Boolean, default: false },
}, {
    timestamps: true
});
notificationMessageSchema.method('toJSON', function () {
    return {
        id: this._id,
        from: this.from,
        to: this.to,
        time: this.createdAt,
    };
});
exports.NotificationMessage = mongoose_1.model("NotificationMessage", notificationMessageSchema);
//# sourceMappingURL=noitificationMessage.js.map