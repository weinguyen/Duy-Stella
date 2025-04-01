"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duan = exports.Thongtin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contact = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true }
});
const project = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    github: { type: String, required: true },
    image: { type: String, required: true },
});
exports.Thongtin = mongoose_1.default.model("Contactor", contact);
exports.Duan = mongoose_1.default.model("projects", project);
