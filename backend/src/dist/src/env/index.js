"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const local_1 = __importDefault(require("./local"));
const production_1 = __importDefault(require("./production"));
const joinEnv = { local: local_1.default, production: production_1.default };
const processVar = process.env.NODE_ENV === "local" ? "local" : "production";
const envVars = joinEnv[processVar];
exports.default = envVars;
