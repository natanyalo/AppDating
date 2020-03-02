"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeCenter_1 = require("../controllers/homeCenter");
const check_auth_1 = __importDefault(require("../middleware/check-auth"));
const router = express_1.Router();
// next for to prevent sitution that the code stack because it
// is not send back response
router.get("", check_auth_1.default, homeCenter_1.getUsers);
router.post("/want", check_auth_1.default, homeCenter_1.addWant);
exports.default = router;
//# sourceMappingURL=homeCenter.js.map