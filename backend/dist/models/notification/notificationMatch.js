"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationMatchSchema = new mongoose_1.Schema({
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
notificationMatchSchema.method('toJSON', function () {
    return {
        id: this._id,
        from: this.from,
        to: this.to,
        time: this.createdAt,
    };
});
exports.NotificationMatch = mongoose_1.model("NotificationMatch", notificationMatchSchema);
//# sourceMappingURL=notificationMatch.js.map