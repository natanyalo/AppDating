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
const noitificationMessage_1 = require("../notification/noitificationMessage");
const notificationMatch_1 = require("../notification/notificationMatch");
class FactoryObj {
    constructor() { }
    static getInstanceFactory() {
        if (!FactoryObj._factoryObj)
            FactoryObj._factoryObj = new FactoryObj();
        return FactoryObj._factoryObj;
    }
    createObj(type, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("dggggg", type);
            try {
                console.log("ג", type);
                let newObj;
                switch (type) {
                    case "Message":
                        newObj = new noitificationMessage_1.NotificationMessage({
                            from: obj.from,
                            to: obj.to,
                        });
                        yield newObj.save();
                    case "Match":
                        newObj = new notificationMatch_1.NotificationMatch({
                            from: obj.from,
                            to: obj.to,
                        });
                        yield newObj.save();
                }
                return true;
            }
            catch (e) {
                console.log("errr");
                return false;
            }
        });
    }
}
exports.FactoryObj = FactoryObj;
//# sourceMappingURL=factoryObj.js.map