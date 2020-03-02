"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.addressSchema = new mongoose_1.Schema({
    city: {
        type: String,
        required: true
    },
    coordinates: {
        type: {
            lat: Number,
            lon: Number
        },
        required: true
    }
});
//# sourceMappingURL=address.js.map