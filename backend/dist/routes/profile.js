"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_1 = require("../controllers/profile");
const check_auth_1 = __importDefault(require("../middleware/check-auth"));
const file_1 = __importDefault(require("../middleware/file"));
const router = express_1.Router();
// function call without () is mean ref to function
router.post("", check_auth_1.default, file_1.default, profile_1.saveProfile);
router.put("", check_auth_1.default, file_1.default, profile_1.upDateProfile);
router.get("", check_auth_1.default, profile_1.getProfile);
exports.default = router;
//# sourceMappingURL=profile.js.map