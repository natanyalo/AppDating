import { Chet, IChet } from "../models/chet";
import { Profile, IProfile } from "../models/profile";
import { FactoryObj } from "../models/fcatory/factoryObj";
import { EnumNotification } from "../models/enum";
import { User, IUser } from "../models/user";
//import { User } from "src/models/user";

export function SocketChet(Server: any) {
    const io = require('socket.io')(Server);
    io.on("connection", (socket: any) => {
        socket.on("getDoc",
            async (users: any) => {
                const onePofile = await Profile.findOne({ creator: users.userIdOne });
                const secodUser = await Profile.findOne({ _id: users.profileIdSecond });
                let chets = await Chet.findOne({
                    $or: [
                        { user1: onePofile.id, user2: users.profileIdSecond },
                        { user1: users.profileIdSecond, user2: onePofile.id }
                    ]
                });
                if (chets === null) {
                    chets = new Chet({
                        user1: onePofile.id,
                        user2: users.profileIdSecond,
                        messages: []
                    })
                    await chets.save();
                }
                socket.join(chets.id);
                console.log(secodUser)
                socket.join(secodUser.id)
                io.sockets.in(chets.id).emit("chetMessages", chets ? chets : null);
               // io.sockets.in(secodUser.id).emit("notificationMessage", null);
            });
        socket.on("addDoc",
            async (request: any) => {
                let chet = await Chet.findOne({ _id: request.chet.id });
                chet.messages.push(request.chet.messages[0]);
                await chet.save();
                socket.join(chet.id);
                let notificationFactory: FactoryObj = FactoryObj.getInstanceFactory();
                const notification = await notificationFactory.createObj(EnumNotification.Message,
                    await convertProfileToUser(request.userId, chet.user1, chet.user2)
                );
                console.log("from",notification.from)
                const profile: IProfile = await Profile.findOne({ creator: notification.from });
                io.sockets.in(chet.id).emit("chetMessages", chet ? chet : null);
                io.sockets.in(notification.to).emit("notificationMessage", profile ? profile : null);
            });
    });

}
async function convertProfileToUser(userIdOne: string, profileIdOne: any, profileIdSecod: any) {
    console.log("uuu",userIdOne)
    const profiles: IProfile[] = await Profile.find({ _id: { $in: [profileIdOne, profileIdSecod] } })
    const users: IUser[] = await User.find({ _id: { $in: profiles.map(v => v.creator) } });
    return { from: userIdOne, to: users.filter(v => v.id !== userIdOne)[0].id }
}