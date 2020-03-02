import multer, { diskStorage } from "multer";

let MIME_TYPE_MAP= new Map<string,string>();
MIME_TYPE_MAP.set('image/png','png');
MIME_TYPE_MAP.set( 'image/jpeg','jpg')
MIME_TYPE_MAP.set('image/jpg','jpg')

const storage = diskStorage({
    destination: (req: any, file: any, cb: any) => {
        const isValid = MIME_TYPE_MAP.get(file.mimetype);
        let error = new Error("Invalide mine type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req:any, file:any, cb:any) => {
        const name = file.originalname.toLowerCase().
            split(" ").join("-");
        const ext =  MIME_TYPE_MAP.get(file.mimetype);
        cb(null, name + "-" + Date.now() + "." + ext);

    }
});

export default multer({ storage:storage }).single("image");
