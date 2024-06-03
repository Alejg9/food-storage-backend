"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groups_1 = require("../controllers/groups");
const auth_1 = __importDefault(require("../auth"));
const router = (0, express_1.Router)();
router.get('/groups', auth_1.default, groups_1.getGroups);
router.get('/groups/:id', auth_1.default, groups_1.getGroup);
router.post('/groups', auth_1.default, groups_1.saveGroup);
router.put('/groups/:id', auth_1.default, groups_1.updateGroup);
router.delete('/groups/:id', auth_1.default, groups_1.deleteGroup);
exports.default = router;
