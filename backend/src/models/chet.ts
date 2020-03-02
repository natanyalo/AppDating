import { Document, model, Schema } from "mongoose";
import {IMessage, MessageSchema} from './message';
export interface IChet extends Document {
    id?: string;
    user1: Schema.Types.ObjectId;
    user2: Schema.Types.ObjectId;
    messages: IMessage[];

}
export const ChetSchema = new Schema({
    user1: {
        ref: "Profile",
        require: true,
        type: Schema.Types.ObjectId,
    },
    user2: {
        ref: "Profile",
        require: true,
        type: Schema.Types.ObjectId,
    },
    messages: [MessageSchema],
});
ChetSchema.method('toJSON', function () {
    return {
        id: this._id,
        user1: this.user1,
        user: this.user2,
        messages: this.messages|| []
    }
})
export const Chet = model<IChet>("Chet", ChetSchema);
