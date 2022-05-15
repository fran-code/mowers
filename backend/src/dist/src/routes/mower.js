"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mower_1 = require("../controllers/mower");
const express_1 = __importDefault(require("express"));
const mower = express_1.default.Router();
mower.route('/calculateRoutes')
    .post(mower_1.calculateRoutes);
exports.default = mower;
