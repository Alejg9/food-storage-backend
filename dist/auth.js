"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = module.exports = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = yield ((_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        if (!token)
            return response.status(401).json({ error: new Error('Unauthorized') });
        const decodedToken = yield jsonwebtoken_1.default.verify(token, 'RANDOM-TOKEN');
        const user = decodedToken;
        if (!user)
            return response.status(401).json({ error: new Error('Unauthorized') });
        request.user = user;
        next();
    }
    catch (error) {
        return response.status(401).json({
            error: new Error('Invalid request!')
        });
    }
});
