import { INotification } from "../../models/notification/INotification";
import { FactoryObj } from "../../models/fcatory/factoryObj"
import { NotificationMatch } from "../../models/notification/notificationMatch";
import { EnumNotification } from '../../models/enum'
import { Profile } from "../../models/profile";
export async function createMatch(req: any, res: any) {
    const data = req.body as INotification;
    const factory = FactoryObj.getInstanceFactory();
    const answer = await factory.createObj(EnumNotification.Match, data);
    answer ? res.status(200).json({}) : res.status(400).json({});
}
export async function getMatch(req: any, res: any) {
    const id = req.userData.userId;
    const notification=await NotificationMatch.find({ to: id,read:false });
    const profiles=await Profile.find({creator:{ $in: notification.map(item=>item.from) }});
    profiles ? res.status(200).json({profiles}) : res.status(400).json({profiles:[]});
}
export async function hideNotification(req: any, res: any,next:any) {
    const id = req.userData.userId;
    const userIdFrom=req.body.userIdFrom;
    await NotificationMatch.updateOne({to:id,from:userIdFrom},{read:true});
    next();
}