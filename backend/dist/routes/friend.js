"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_auth_1 = __importDefault(require("../middleware/check-auth"));
const friend_1 = require("../controllers/friend");
const router = express_1.Router();
router.get("", check_auth_1.default, friend_1.getFriends);
exports.default = router;
//# sourceMappingURL=friend.js.map