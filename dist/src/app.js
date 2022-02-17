"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var errorHandlingMiddleware_1 = __importDefault(require("./middlewares/errorHandlingMiddleware"));
var calcDistancesRouter_1 = __importDefault(require("./routers/calcDistancesRouter"));
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.get('/health', function (_req, res) {
    res.send('OK!');
});
app.use('/', calcDistancesRouter_1["default"]);
app.use(errorHandlingMiddleware_1["default"]);
exports["default"] = app;
