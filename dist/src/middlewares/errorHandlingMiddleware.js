"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_status_1 = __importDefault(require("http-status"));
function errorHandlingMiddleware(err, _req, res, _next) {
    if (err.name === 'InvalidDataError') {
        return res.status(http_status_1["default"].UNPROCESSABLE_ENTITY).send({
            message: err.message
        });
    }
    if (err.name === 'AddressNotFound') {
        return res.status(http_status_1["default"].NOT_FOUND).send({
            message: err.message
        });
    }
    console.log(err);
    res.status(http_status_1["default"].INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error!'
    });
}
exports["default"] = errorHandlingMiddleware;
