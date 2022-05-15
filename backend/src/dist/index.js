"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./env"));
const cors_1 = __importDefault(require("cors"));
const mower_1 = __importDefault(require("./routes/mower"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use('/mower', mower_1.default);
app.listen(env_1.default.port, () => console.log(`App listening on port: ${env_1.default.port}`));
exports.default = app;
