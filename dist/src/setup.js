"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var envFile = '.env';
if (process.env.NODE_ENV === 'dev') {
    envFile = '.env.dev';
}
if (process.env.NODE_ENV === 'test') {
    envFile = '.env.test';
}
dotenv_1["default"].config({ path: envFile });
