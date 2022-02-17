"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var address = joi_1["default"].object().keys({
    street: joi_1["default"].string().required(),
    number: joi_1["default"].number(),
    neighborhood: joi_1["default"].string(),
    city: joi_1["default"].string(),
    state: joi_1["default"].string().min(2).max(2),
    zipCode: joi_1["default"].number().integer()
});
exports["default"] = joi_1["default"].array().min(2).items(address);
