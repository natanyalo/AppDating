"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationMatch_1 = require("../controllers/notification/notificationMatch");
const notificationMessage_1 = require("../controllers/notification/notificationMessage");
const check_auth_1 = __importDefault(require("../middleware/check-auth"));
const router = express_1.Router();
// next for to prevent sitution that the code stack because it
// is not send back response
router.get("/match", check_auth_1.default, notificationMatch_1.getMatch);
router.get("/message", check_auth_1.default, notificationMessage_1.getMeassage);
router.post("/match", check_auth_1.default, notificationMatch_1.createMatch);
router.post("/message", check_auth_1.default, notificationMessage_1.createMessage);
exports.default = router;
//# sourceMappingURL=notification.js.map