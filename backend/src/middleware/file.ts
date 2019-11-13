import multer from "multer";
/*const  MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}*/
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        const isValid = file.mimetype;
        let error = new Error("Invalide mine type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().
            split(" ").join("-");
        const ext = file.mimetype;
        cb(null, name + "-" + Date.now() + "." + ext);

    }
});

export default multer({ storage }).single("image");
