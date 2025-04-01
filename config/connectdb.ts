import mongoose from "mongoose";
const db = async () =>{
    await mongoose.connect("mongodb://localhost:27017/DuyStella")
    console.log("kết nối thành công");
}
export default db;