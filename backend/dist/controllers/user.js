"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = require("../models/user");
function userSignUp(req, res, next) {
    bcrypt_1.hash(req.body.password, 10).
        then((hash) => {
        const user = new user_1.User({
            email: req.body.email,
            password: hash,
        });
        user.save().then((result) => {
            const token = jsonwebtoken_1.sign({
                email: result.email,
                userId: result._id
            }, process.env.JWT_TOKEN, { expiresIn: "1h" });
            res.status(200).json({
                token, timer: "3000",
                userId: result._id
            });
        }).catch((error) => {
            res.status(400).json({ error });
        });
    });
}
exports.userSignUp = userSignUp;
function userLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userfatch = yield user_1.User.findOne({ email: req.body.email });
        if (!userfatch) {
            res.status(401).json({
                messege: "auth faild"
            });
        }
        const verifyPassword = yield bcrypt_1.compare(req.body.password, userfatch.password);
        if (!verifyPassword) {
            res.status(401).json({
                messege: "auth faild"
            });
        }
        const token = jsonwebtoken_1.sign({
            email: userfatch.email,
            userId: userfatch._id
        }, process.env.JWT_TOKEN, { expiresIn: "1h" });
        res.status(200).json({
            token, timer: "3000",
            userId: userfatch._id
        });
    });
}
exports.userLogin = userLogin;
//# sourceMappingURL=user.js.map