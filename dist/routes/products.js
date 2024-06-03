"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const auth_1 = __importDefault(require("../auth"));
const router = (0, express_1.Router)();
router.get('/products/:groupId', auth_1.default, products_1.getProducts);
router.get('/products/:groupId/:id', auth_1.default, products_1.getProduct);
router.post('/products/:groupId', auth_1.default, products_1.saveProduct);
router.put('/products/:groupId/:id', auth_1.default, products_1.updateProduct);
router.delete('/products/:groupId/:id', auth_1.default, products_1.deleteProduct);
exports.default = router;
