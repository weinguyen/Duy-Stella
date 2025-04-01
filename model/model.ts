import mongoose, { model } from "mongoose";
const contact = new mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String, required : true},
    phone:{type:String, required : true},
    message: {type:String, required : true}
})
const project = new mongoose.Schema({
    title : {type:String , required:true},
    description : {type:String, required : true},
    github:{type:String, required : true},
    image:{type:String, required : true},
})
export const Thongtin = mongoose.model("Contactor", contact);
export const Duan = mongoose.model("projects", project);