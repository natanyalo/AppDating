"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.profileSchema = new mongoose_1.Schema({
    phoneNumber: { type: Number, require: true },
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    favorite: { type: String, require: true },
    minimum: { type: String, require: true },
    age: { type: String, require: true },
    maximum: { type: String, require: true },
    range: { type: Number, require: true },
    summery: { type: String, require: true },
    city: { type: String, require: true },
    imagePath: { type: String, require: true },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "User",
        require: true
    }
});
exports.Profile = mongoose_1.model("Profile", exports.profileSchema);
//# sourceMappingURL=profile.js.map