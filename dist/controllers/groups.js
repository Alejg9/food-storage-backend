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
exports.deleteGroup = exports.updateGroup = exports.saveGroup = exports.getGroup = exports.getGroups = void 0;
const prisma_1 = require("../prisma");
function getGroups(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        try {
            const groups = yield prisma_1.prisma.group.findMany({
                where: {
                    ownerId: userId
                }
            });
            res.status(200).json({ groups, status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'groups not found', status: 400 });
        }
    });
}
exports.getGroups = getGroups;
function getGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const group = yield prisma_1.prisma.group.findUnique({
                where: {
                    id: id
                }
            });
            res.json({ group, status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'group not found', status: 400 });
        }
    });
}
exports.getGroup = getGroup;
function saveGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, ownerId, description } = req.body;
        try {
            const group = yield prisma_1.prisma.group.create({
                data: {
                    name,
                    ownerId,
                    description
                }
            });
            yield prisma_1.prisma.usersOnGroup.create({
                data: {
                    userId: ownerId,
                    groupId: group.id
                }
            });
            res.status(200).json({ group, status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'group not created', status: 400 });
        }
    });
}
exports.saveGroup = saveGroup;
function updateGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const group = yield prisma_1.prisma.group.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    description
                }
            });
            res.status(200).json({ group, status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'group not updated', status: 400 });
        }
    });
}
exports.updateGroup = updateGroup;
function deleteGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield prisma_1.prisma.group.delete({
                where: {
                    id: id
                }
            });
            res.status(200).json({ message: 'group deleted', status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'group not deleted', status: 400 });
        }
    });
}
exports.deleteGroup = deleteGroup;
