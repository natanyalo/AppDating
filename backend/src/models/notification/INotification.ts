import { Document, Schema} from "mongoose";
export interface INotification extends Document {
    from: Schema.Types.ObjectId;
    to: Schema.Types.ObjectId;
    time?: Date;
}
