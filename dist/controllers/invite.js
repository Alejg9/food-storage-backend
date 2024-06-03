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
exports.inviteUser = void 0;
const prisma_1 = require("../prisma");
function inviteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.params;
        const { groupId } = req.body;
        if (!email || !groupId) {
            res.status(400).json({ message: 'Email and groupId are required', status: 400 });
            return;
        }
        const group = yield prisma_1.prisma.group.findUnique({
            where: {
                id: groupId
            }
        });
        if (!group) {
            res.status(404).json({ message: 'Group not found', status: 400 });
            return;
        }
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            res.status(404).json({ message: 'User not found', status: 400 });
            return;
        }
        const userOnGroup = yield prisma_1.prisma.usersOnGroup.findFirst({
            where: {
                userId: user.id,
                groupId
            }
        });
        if (userOnGroup) {
            res.status(400).json({ message: 'User already in group', status: 400 });
            return;
        }
        const invite = yield prisma_1.prisma.usersOnGroup.create({
            data: {
                userId: user.id,
                groupId
            }
        });
        res.status(200).json({ invite, status: 200 });
    });
}
exports.inviteUser = inviteUser;
