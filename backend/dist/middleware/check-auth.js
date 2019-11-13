"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
// זה פונקציה שבודקת את אימות משתשמש אם לא זורקת שגיאה ולא מתקדם
// למשימה הבא
exports.default = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jsonwebtoken_1.verify(token, "secret"); // if is not verfiy is trow error
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next(); // continue to next task
    }
    catch (error) {
        res.status(401).json({ messeage: "you are not authenticated!" });
    }
};
//# sourceMappingURL=check-auth.js.map