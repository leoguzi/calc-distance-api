"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("./setup");
var app_1 = __importDefault(require("./app"));
app_1["default"].listen(process.env.PORT, function () {
    console.log("Server is listening on port ".concat(process.env.PORT, "."));
});
