import {Thongtin,Duan} from "../model/model";
import { Request, Response } from "express";

export const guithongtin = async (req:Request,res:Response) => {
    try {
    const check = await Thongtin.findOne(req.body)
    if(check){
        res.send("Bạn đã gửi rồi")
    }
    else{
        await Thongtin.create(req.body)
        res.send("Gửi thành công")
    }}
    catch (error) {
        res.status(500).send("Vui lòng nhập đủ")
    }
}

export const xemthongtin = async (req:Request,res:Response) => {
    const data = await Thongtin.find()
    res.send(data)
}
export const xoathongtin = async (req:Request,res:Response) => {
    const {_id} = req.body
    const data = await Thongtin.findByIdAndDelete(_id);
   
   res.send(data);
}

export const xemproject = async (req:Request,res:Response) => {
    const data = await Duan.find()
    res.send(data)
}

export const guiproject = async (req:Request,res:Response) => {
    try {
    const check = await Duan.findOne(req.body)
    if(check){
        res.send("Đã tồn tại")
    }
    else{
        await Duan.create(req.body)
        res.send("Gửi thành công")
    }}
    catch (error) {
        res.send("Vui lòng nhập đủ")
    }
}
export const xoaproject = async (req:Request,res:Response) => {
    const {_id} = req.body
    res.send(await Duan.findByIdAndDelete(_id));
}
