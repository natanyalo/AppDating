"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const options = { discriminatorKey: 'kind' };
const NotificationSchema = new mongoose_1.Schema({
    from: {
        ref: "Profile",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId
    },
    to: {
        ref: "Profile",
        require: true,
        type: mongoose_1.Schema.Types.ObjectId
    }
}, options);
exports.Notification = mongoose_1.model("Notification", NotificationSchema);
//# sourceMappingURL=notification.js.map