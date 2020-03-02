import { NotificationMessage } from "../notification/noitificationMessage";
import { NotificationMatch } from "../notification/notificationMatch";

export class FactoryObj {
    private static _factoryObj: FactoryObj;
    private constructor() { }

    public static getInstanceFactory() {
        if (!FactoryObj._factoryObj)
            FactoryObj._factoryObj = new FactoryObj();
        return FactoryObj._factoryObj;
    }
    public async createObj(type: string, obj: any) {
        try {
            let newObj;
            switch (type) {
                case "Message":
                    newObj = new NotificationMessage({
                        from: obj.from,
                        to: obj.to,
                    })
                    await newObj.save();
                case "Match":
                    newObj = new NotificationMatch({
                        from: obj.from,
                        to: obj.to,
                    })
                    await newObj.save();

            }
            return newObj;
        }
        catch (e) {
            return null;
        }
    }
}