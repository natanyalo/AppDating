import { INotification } from "../../models/notification/INotification";
import { FactoryObj } from "../../models/fcatory/factoryObj"
import { NotificationMessage } from "../../models/notification/noitificationMessage";
import { EnumNotification } from '../../models/enum'
import { Profile } from "../../models/profile";
export async function createMessage(req: any, res: any) {
    const data = req.body as INotification;
    const factory = FactoryObj.getInstanceFactory();
    await factory.createObj(EnumNotification.Message, data) ? res.status(200).json({}) : res.status(400).json({});
}
export async function getMeassage(req: any, res: any) {
    const id = req.userData.userId;
   const notification= await NotificationMessage.find({ to: id ,read:false});
   const profiles=await Profile.find({creator:{ $in: notification.map(item=>item.from) }});
   profiles ? res.status(200).json({profiles}) : res.status(400).json({profiles:[]});        
}
export async function hideNotification(req: any, res: any,next:any) {
    const id = req.userData.userId;
    const userIdFrom=req.body.userIdFrom;
    await NotificationMessage.updateOne({to:id,from:userIdFrom},{read:true});
    next();
}

