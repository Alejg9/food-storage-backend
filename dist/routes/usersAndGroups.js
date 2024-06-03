"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersAndGroups_1 = require("../controllers/usersAndGroups");
const auth_1 = __importDefault(require("../auth"));
const router = (0, express_1.Router)();
router.get('/usersAndGroups/users/:groupId', auth_1.default, usersAndGroups_1.getUsersFromGroup);
router.get('/usersAndGroups/:userId/groups', auth_1.default, usersAndGroups_1.getGroupsFromUser);
router.delete('/usersAndGroups/:userId/:groupId', auth_1.default, usersAndGroups_1.deleteUsersFromGroup);
exports.default = router;
