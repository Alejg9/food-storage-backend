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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsersFromGroup = exports.getGroupsFromUser = exports.getUsersFromGroup = void 0;
const prisma_1 = require("../prisma");
function getUsersFromGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { groupId } = req.params;
        try {
            const relations = yield prisma_1.prisma.usersOnGroup.findMany({
                where: {
                    groupId: groupId
                }
            });
            const users = yield prisma_1.prisma.user.findMany({
                where: {
                    id: {
                        in: relations.map(relation => relation.userId)
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    lastname: true
                }
            });
            res.json(users);
        }
        catch (error) {
            res.status(400).json({ message: 'users not found', status: 400 });
        }
    });
}
exports.getUsersFromGroup = getUsersFromGroup;
function getGroupsFromUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const relations = yield prisma_1.prisma.usersOnGroup.findMany({
                where: {
                    userId: userId
                }
            });
            const groups = yield prisma_1.prisma.group.findMany({
                where: {
                    id: {
                        in: relations.map(relation => relation.groupId)
                    }
                }
            });
            res.status(200).json({ groups, status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'groups not found', status: 400 });
        }
    });
}
exports.getGroupsFromUser = getGroupsFromUser;
function deleteUsersFromGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, groupId } = req.params;
        try {
            const userOn = yield prisma_1.prisma.usersOnGroup.findMany({
                where: {
                    userId: userId,
                    groupId: groupId
                }
            });
            if (!userOn || userOn.length === 0) {
                res.status(400).json({ message: 'user not found in group', status: 400 });
                return;
            }
            else if (userOn.length > 1) {
                res.status(400).json({ message: 'multiple users found in group', status: 400 });
                return;
            }
            const data = yield prisma_1.prisma.usersOnGroup.deleteMany({
                where: {
                    id: userOn[0].id
                }
            });
            console.log(userOn, data);
            res.status(200).json({ message: 'user removed from group', status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'user not removed from group', status: 400 });
        }
    });
}
exports.deleteUsersFromGroup = deleteUsersFromGroup;
