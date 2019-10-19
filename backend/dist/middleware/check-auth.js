"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require("jsonwebtoken");

//זה פונקציה שבודקת את אימות משתשמש אם לא זורקת שגיאה ולא מתקדם 
// למשימה הבא
exports.default = function (req, res, next) {

  try {
    var token = req.headers.authorization.split(" ")[1];
    console.log(token);
    var decodedToken = (0, _jsonwebtoken.verify)(token, "secret"); //if is not verfiy is trow error
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };

    next(); //continue to next task 
  } catch (error) {
    res.status(401).json({ messeage: "you are nor authenticated!" });
  }
};