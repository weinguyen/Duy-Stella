"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectdb_1 = __importDefault(require("./config/connectdb"));
const router_1 = __importDefault(require("./router/router"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importStar(require("./config/multer"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "./view")));
app.use(express_1.default.static(path_1.default.join(__dirname, "./view/client")));
app.use(express_1.default.static(path_1.default.join(__dirname, "./view/admin")));
app.use("/upload", express_1.default.static(path_1.default.join(__dirname, "./uploads")));
(0, connectdb_1.default)();
app.use(express_1.default.json());
app.use("/", router_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "./view/client/projects.html"));
});
app.get("/admin", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "./view/admin/login.html"));
});
app.post("/upload", multer_1.default.single("image"), (req, res) => {
    res.send(`https://localhost/upload/${multer_1.namefile}`);
});
const options = {
    key: fs_1.default.readFileSync('localhost+2-key.pem'),
    cert: fs_1.default.readFileSync('localhost+2.pem')
};
https_1.default.createServer(options, app).listen(443);
