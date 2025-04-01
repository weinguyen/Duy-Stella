"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xoaproject = exports.guiproject = exports.xemproject = exports.xoathongtin = exports.xemthongtin = exports.guithongtin = void 0;
const model_1 = require("../model/model");
const guithongtin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield model_1.Thongtin.findOne(req.body);
        if (check) {
            res.send("Bạn đã gửi rồi");
        }
        else {
            yield model_1.Thongtin.create(req.body);
            res.send("Gửi thành công");
        }
    }
    catch (error) {
        res.status(500).send("Vui lòng nhập đủ");
    }
});
exports.guithongtin = guithongtin;
const xemthongtin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield model_1.Thongtin.find();
    res.send(data);
});
exports.xemthongtin = xemthongtin;
const xoathongtin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const data = yield model_1.Thongtin.findByIdAndDelete(_id);
    res.send(data);
});
exports.xoathongtin = xoathongtin;
const xemproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield model_1.Duan.find();
    res.send(data);
});
exports.xemproject = xemproject;
const guiproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield model_1.Duan.findOne(req.body);
        if (check) {
            res.send("Đã tồn tại");
        }
        else {
            yield model_1.Duan.create(req.body);
            res.send("Gửi thành công");
        }
    }
    catch (error) {
        res.send("Vui lòng nhập đủ");
    }
});
exports.guiproject = guiproject;
const xoaproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    res.send(yield model_1.Duan.findByIdAndDelete(_id));
});
exports.xoaproject = xoaproject;
