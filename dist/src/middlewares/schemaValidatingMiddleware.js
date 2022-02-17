"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var InvalidData_1 = __importDefault(require("../errors/InvalidData"));
function schemaValidatingMiddleware(schema, options) {
    if (options === void 0) { options = { abortEarly: false }; }
    return function (req, res, next) {
        var validation = schema.validate(req.body, {
            abortEarly: options.abortEarly
        });
        if (validation.error) {
            throw new InvalidData_1["default"]('Body');
        }
        next();
    };
}
exports["default"] = schemaValidatingMiddleware;
