import express from "express";
import * as control from "../controller/controller";
import upload,{namefile} from "../config/multer";
const router = express.Router();      
router.post("/guithongtin",control.guithongtin);
router.get("/xemthongtin",control.xemthongtin);
router.delete("/xoathongtin",control.xoathongtin);
router.post("/guiproject",control.guiproject);
router.get("/xemproject",control.xemproject);
router.delete("/xoaproject",control.xoaproject);

export default router