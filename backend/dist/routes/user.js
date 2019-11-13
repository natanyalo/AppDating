"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = express_1.Router();
// function call without () is mean ref to function
router.post("/signup", user_1.userSignUp);
router.post("/login", user_1.userLogin);
exports.default = router;
//# sourceMappingURL=user.js.map