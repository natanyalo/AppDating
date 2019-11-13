"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSechma = new mongoose_1.Schema({
    title: { type: String, require: true },
    content: String,
    imagePath: String,
    creator: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "User",
        require: true
    }
});
exports.default = mongoose_1.model("post", postSechma);
//# sourceMappingURL=post.js.map