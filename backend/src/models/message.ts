import { Document, Schema, model } from "mongoose";

export interface IMessage extends Document {
    id?: string;
    user: Schema.Types.ObjectId;
    message: String;
}
export const MessageSchema = new Schema(
    {
        user: {
            ref: "Profile",
            require: true,
            type: Schema.Types.ObjectId,
        },
        message: {
            type: String,
            required: true
        },
    },
    
)
MessageSchema.method('toJSON', function () {
    return {
        id: this._id,
        user: this.user,
        message: this.message,
        createdAt:this.createdAt
    }
})
export const Message = model<IMessage>("Message", MessageSchema);