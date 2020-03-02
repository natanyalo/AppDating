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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./models/config");
const chet_1 = require("./models/chet");
const profile_1 = require("./models/profile");
mongoose_1.default.connect(config_1.url);
process.env.JWT_TOKEN = "secret";
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.log(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug_1.default("Listening on " + bind);
};
const port = normalizePort(process.env.PORT || "3000");
app_1.default.set("port", port);
const server = http_1.default.createServer(app_1.default);
server.on("error", onError);
server.on("listening", onListening);
const res = server.listen(port);
const io = require('socket.io')(res);
io.on("connection", (socket) => {
    socket.on("getDoc", (users) => __awaiter(void 0, void 0, void 0, function* () {
        const profile = yield profile_1.Profile.findOne({ creator: users.user1 });
        let chets = yield chet_1.Chet.findOne({
            $or: [
                { user1: profile.id, user2: users.user2 },
                { user1: users.user2, user2: profile.id }
            ]
        });
        if (chets === null) {
            chets = new chet_1.Chet({
                user1: profile.id,
                user2: users.user2,
                messages: []
            });
            yield chets.save();
        }
        socket.join(chets.id);
        io.sockets.in(chets.id).emit("getMessages", chets ? chets : null);
    }));
    socket.on("addDoc", (sendChet) => __awaiter(void 0, void 0, void 0, function* () {
        let chets = yield chet_1.Chet.findOne({ _id: sendChet.id });
        chets.messages.push(sendChet.messages[0]);
        yield chets.save();
        socket.join(chets.id);
        io.sockets.in(chets.id).emit("getMessages", chets ? chets : null);
    }));
    /* socket.on("editDoc", async (chet: IChet) => {
       const profile = await Profile.findOne({ creator: chet.user1 });
       const chets = await Chet.findOne({
         $or: [
           { user1: profile.id, user2: chet.user2 },
           { user1: chet.user2, user2: profile.id }
         ]
       });
       chets.messages[0].user = profile.id;
       chets.messages.push(chet.messages[0])
       await chets.save();
       //socket.emit("getMessages", { messages: chet.messages });
       socket.to(chets.id).emit("getMessages", chets ? chets.messages : []);
     });*/
});
//# sourceMappingURL=server.js.map