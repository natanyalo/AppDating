'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

var storage = (0, _multer.diskStorage)({
    destination: function destination(req, file, cb) {
        var isValid = MIME_TYPE_MAP[file.mimetype];
        var error = new Error("Invalide mine type");
        if (isValid) error = null;
        cb(error, "backend/images");
    },
    filename: function filename(req, file, cb) {

        var name = file.originalname.toLowerCase().split(' ').join('-');

        var ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

exports.default = (0, _multer2.default)({ storage: storage }).single('image');