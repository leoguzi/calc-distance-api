"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getDistances = void 0;
var API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var API_KEY = process.env.GEOCODING_API_KEY;
var axios_1 = __importDefault(require("axios"));
var AddressNotFound_1 = __importDefault(require("../errors/AddressNotFound"));
function getDistances(addresses) {
    return __awaiter(this, void 0, void 0, function () {
        var response, addressesWithCoordinates, allDistances, interestDistances, finalResult;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = addresses.map(function (address) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getAddressCoordinates(address)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, Promise.all(response)];
                case 1:
                    addressesWithCoordinates = _a.sent();
                    allDistances = getAllDistances(addressesWithCoordinates);
                    interestDistances = findClosestAndFarthestAddress(allDistances);
                    finalResult = {
                        closestAddresses: interestDistances.closest,
                        farthestAddresses: interestDistances.farthest,
                        otherDistances: allDistances.filter(function (distance) {
                            return distance !== interestDistances.closest &&
                                distance !== interestDistances.farthest;
                        })
                    };
                    return [2 /*return*/, finalResult];
            }
        });
    });
}
exports.getDistances = getDistances;
function getAddressCoordinates(address) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var querryString, response, addressWithCoordinates;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    querryString = buildQuery(address);
                    return [4 /*yield*/, axios_1["default"].get(API_URL + querryString + '&key=' + API_KEY)];
                case 1:
                    response = _b.sent();
                    if (!response.data.results[0]) {
                        throw new AddressNotFound_1["default"]();
                    }
                    addressWithCoordinates = __assign(__assign({}, address), { formattedAddress: response.data.results[0].formatted_address, location: (_a = response.data.results[0]) === null || _a === void 0 ? void 0 : _a.geometry.location });
                    return [2 /*return*/, addressWithCoordinates];
            }
        });
    });
}
function buildQuery(address) {
    var addressString = '';
    for (var property in address) {
        addressString += ",+".concat(address[property]);
    }
    addressString = addressString.replace(',+', '');
    addressString = addressString.replace(/ /g, '+');
    addressString = addressString
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    return addressString;
}
function getAllDistances(addresses) {
    var allDistances = [];
    for (var i = 0; i < addresses.length; i++) {
        for (var j = i + 1; j < addresses.length; j++) {
            allDistances.push({
                address1: addresses[i].formattedAddress,
                address2: addresses[j].formattedAddress,
                distance: Number(calcDistance(addresses[i].location, addresses[j].location).toFixed(2))
            });
        }
    }
    return allDistances;
}
function calcDistance(address1, address2) {
    var dlat = address1.lat - address2.lat;
    var dlng = address1.lng - address2.lng;
    var distanceInDegrees = Math.sqrt(Math.pow(dlat, 2) + Math.pow(dlng, 2));
    var distanceInKm = distanceInDegrees * 111.12;
    return distanceInKm;
}
function findClosestAndFarthestAddress(allDistances) {
    var closest = allDistances[0];
    var farthest = allDistances[0];
    for (var i = 1; i < allDistances.length; i++) {
        if (allDistances[i].distance < closest.distance) {
            closest = allDistances[i];
        }
        if (allDistances[i].distance > farthest.distance) {
            farthest = allDistances[i];
        }
    }
    return {
        closest: closest,
        farthest: farthest
    };
}
