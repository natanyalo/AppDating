"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.userSechma = new mongoose_1.Schema({
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
});
exports.User = mongoose_1.model("User", exports.userSechma);
//# sourceMappingURL=user.js.map