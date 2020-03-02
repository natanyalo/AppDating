import { Schema, model } from "mongoose";
import { INotification } from "./INotification";

const options = { discriminatorKey: 'kind' };
 const NotificationSchema = new Schema( {
        from: {
            ref: "Profile",
            require: true,
            type: Schema.Types.ObjectId
        },
        to: {
            ref: "Profile",
            require: true,
            type: Schema.Types.ObjectId
        }
    },
 options
)

export const Notification= model<INotification>("Notification", NotificationSchema);