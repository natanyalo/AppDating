"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const config_1 = require("./config");
console.log("process.env.MONGOOSE_URL", process.env.MONGOOSE_URL);
mongoose_1.connect(config_1.url);
exports.default = mongoose_1.default;
//# sourceMappingURL=mongoos.js.map