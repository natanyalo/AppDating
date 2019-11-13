"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
/*const  MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}*/
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const isValid = file.mimetype;
        let error = new Error("Invalide mine type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().
            split(" ").join("-");
        const ext = file.mimetype;
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});
exports.default = multer_1.default({ storage }).single("image");
//# sourceMappingURL=file.js.map