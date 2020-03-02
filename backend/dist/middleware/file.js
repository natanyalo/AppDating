"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importStar(require("multer"));
let MIME_TYPE_MAP = new Map();
MIME_TYPE_MAP.set('image/png', 'png');
MIME_TYPE_MAP.set('image/jpeg', 'jpg');
MIME_TYPE_MAP.set('image/jpg', 'jpg');
const storage = multer_1.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP.get(file.mimetype);
        let error = new Error("Invalide mine type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().
            split(" ").join("-");
        const ext = MIME_TYPE_MAP.get(file.mimetype);
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});
exports.default = multer_1.default({ storage: storage }).single("image");
//# sourceMappingURL=file.js.map