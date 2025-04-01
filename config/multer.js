"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.namefile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
var namefile;
const store = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../uploads/"));
    },
    filename: (req, file, cb) => {
        exports.namefile = namefile = Date.now() + path_1.default.extname(file.originalname);
        cb(null, namefile);
    }
});
const upload = (0, multer_1.default)({ storage: store });
exports.default = upload;
