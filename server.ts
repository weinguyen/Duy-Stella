
import fs from "fs";
import https from "https";

import  express,{Request,Response}  from "express";
import cors from "cors";
import db from "./config/connectdb"
import router from "./router/router";
import path from "path";
import upload,{namefile} from "./config/multer";
const app = express();
app.use(cors()); 
app.use(express.static(path.join(__dirname, "./view")));
app.use(express.static(path.join(__dirname, "./view/client")));
app.use(express.static(path.join(__dirname, "./view/admin")));
app.use("/upload",express.static(path.join(__dirname, "./uploads")));
db();
app.use(express.json());
app.use("/",router)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./view/client/projects.html"));
});
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "./view/admin/login.html"));
});
app.post("/upload", upload.single("image"), (req :Request, res:Response) => {
    res.send( `https://localhost/upload/${namefile}`);
});
const options = {
  key: fs.readFileSync('localhost+2-key.pem'),
  cert: fs.readFileSync('localhost+2.pem')
};

https.createServer(options, app).listen(443);



