"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const address_1 = require("./address");
exports.profileSchema = new mongoose_1.Schema({
    phoneNumber: { type: Number, require: true },
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    favorite: { type: String, require: true },
    minimum: { type: Number, require: true },
    gender: { type: Boolean, required: true },
    age: { type: Number, require: true },
    maximum: { type: Number, require: true },
    range: { type: Number, require: true },
    summery: { type: String, require: true },
    address: { type: address_1.addressSchema, require: true },
    imagePath: { type: String, require: true },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "User",
        require: true
    }
});
exports.profileSchema.method('toJSON', function () {
    return {
        id: this.id,
        phoneNumber: this.phoneNumber,
        lastName: this.lastName,
        firstName: this.firstName,
        favorite: this.favorite,
        minimum: this.minimum,
        age: this.age,
        summery: this.summery,
        address: this.address,
        image: this.imagePath,
        range: this.range,
        maximum: this.maximum,
        creator: this.creator,
        gender: this.gender,
    };
});
exports.Profile = mongoose_1.model("Profile", exports.profileSchema);
//# sourceMappingURL=profile.js.map