import { Router } from 'express';
import { getProducts, getProduct, saveProduct, updateProduct, deleteProduct } from '../controllers/products';
import auth from '../auth';

const router = Router();

router.get('/products/:groupId', auth, getProducts)

router.get('/products/:groupId/:id', auth, getProduct)

router.post('/products/:groupId', auth, saveProduct)

router.put('/products/:groupId/:id', auth, updateProduct)

router.delete('/products/:groupId/:id', auth, deleteProduct)

export default router;