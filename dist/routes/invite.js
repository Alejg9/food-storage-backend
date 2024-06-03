"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invite_1 = require("../controllers/invite");
const auth_1 = __importDefault(require("../auth"));
const router = (0, express_1.Router)();
router.post('/invite/:email', auth_1.default, invite_1.inviteUser);
exports.default = router;
