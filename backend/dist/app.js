"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const homeCenter_1 = __importDefault(require("./routes/homeCenter"));
// import posts from "./routes/posts";
const profile_1 = __importDefault(require("./routes/profile"));
const user_1 = __importDefault(require("./routes/user"));
const friend_1 = __importDefault(require("./routes/friend"));
const notification_1 = __importDefault(require("./routes/notification"));
const app = express_1.default();
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(body_parser_1.json());
// allow to access to file , and tha path is for
// rediraction to right path from "images" to "backend/images"
app.use("/images", express_1.default.static(path_1.join("images")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE,PUT, OPTIONS");
    next();
});
app.use("/api/center", homeCenter_1.default);
app.use("/api/user", user_1.default);
app.use("/api/profile", profile_1.default);
app.use("/api/friend", friend_1.default);
app.use("/api/notification", notification_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map