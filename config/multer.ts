import multer from "multer";
import path from "path";
var namefile:string;
const store = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: (req, file, cb) => {
        namefile = Date.now() + path.extname(file.originalname)
        cb(null,namefile); 
    }})
const upload = multer({ storage: store });
export default upload;
export {namefile} 
