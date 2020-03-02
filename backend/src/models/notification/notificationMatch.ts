
import { Schema, model } from "mongoose";
import { INotification } from "./INotification";
const notificationMatchSchema = new Schema({
  from: {
    ref: "User",
    require: true,
    type: Schema.Types.ObjectId
  },
  to: {
    ref: "User",
    require: true,
    type: Schema.Types.ObjectId

  },
  read:{type:Boolean,default:false},
}, {
  timestamps: true
});
notificationMatchSchema.method('toJSON', function () {
  return {
      id: this._id,
      from: this.from,
      to: this.to,
      time: this.createdAt,
  }
})
export const NotificationMatch = model<INotification>("NotificationMatch", notificationMatchSchema);