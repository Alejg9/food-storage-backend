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
exports.deleteProduct = exports.updateProduct = exports.saveProduct = exports.getProduct = exports.getProducts = void 0;
const prisma_1 = require("../prisma");
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { groupId } = req.params;
        try {
            const products = yield prisma_1.prisma.product.findMany({
                where: {
                    groupId: groupId
                }
            });
            res.status(200).json({ products, message: 'products found', status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'products not found', status: 400 });
        }
    });
}
exports.getProducts = getProducts;
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const product = yield prisma_1.prisma.product.findUnique({
                where: {
                    id: id
                }
            });
            res.status(200).json({ product, message: 'product found', status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'product not found', status: 400 });
        }
    });
}
exports.getProduct = getProduct;
function saveProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, pieces, quantity, units } = req.body;
        const { groupId } = req.params;
        try {
            const product = yield prisma_1.prisma.product.create({
                data: {
                    name,
                    pieces,
                    quantity,
                    units,
                    groupId
                }
            });
            res.status(200).json({ product, message: 'product created', status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'product not created' });
        }
    });
}
exports.saveProduct = saveProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, pieces, quantity, units } = req.body;
        try {
            const product = yield prisma_1.prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    pieces,
                    quantity,
                    units
                }
            });
            res.status(200).json({ product, message: 'product updated', status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'product not updated', status: 400 });
        }
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield prisma_1.prisma.product.delete({
                where: {
                    id: id
                }
            });
            res.status(200).json({ message: 'product deleted', status: 200 });
        }
        catch (error) {
            res.status(400).json({ message: 'product not found', status: 400 });
        }
    });
}
exports.deleteProduct = deleteProduct;
