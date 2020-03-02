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
const factoryObj_1 = require("../../models/fcatory/factoryObj");
const notificationMatch_1 = require("../../models/notification/notificationMatch");
const enum_1 = require("../../models/enum");
function createMatch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const factory = factoryObj_1.FactoryObj.getInstanceFactory();
        const answer = yield factory.createObj(enum_1.EnumNotification.Match, data);
        answer ? res.status(200).json({}) : res.status(400).json({});
    });
}
exports.createMatch = createMatch;
function getMatch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.userData.userId;
        notificationMatch_1.NotificationMatch.find({ to: id }, function (err, notifications) {
            if (err) {
                res.status(400).json({ messege: "cant find a notifications" });
            }
            else {
                res.status(200).json({ notifications });
            }
        });
    });
}
exports.getMatch = getMatch;
//# sourceMappingURL=notificationMatch.js.map