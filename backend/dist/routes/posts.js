"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../controllers/post");
const check_auth_1 = __importDefault(require("../middleware/check-auth"));
const file_1 = __importDefault(require("../middleware/file"));
const router = express_1.Router();
// next for to prevent situion that the code stack because it
// is not send back response
router.get("", post_1.getPosts);
router.post("", check_auth_1.default, file_1.default, post_1.createPost);
router.put("", post_1.upDataPost);
router.delete("/:id", check_auth_1.default, file_1.default, post_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts.js.map