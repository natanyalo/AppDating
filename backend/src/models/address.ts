import { Schema } from "mongoose";

export interface IAddress {
    city: string;
    coordinates: { lat: number, lon: number };
}
export const addressSchema = new Schema({
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
})