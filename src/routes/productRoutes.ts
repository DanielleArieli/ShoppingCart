import { Router } from 'express';
import { getAllProducts, getProductBySku, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController';

const router = Router();

router.get('/', getAllProducts);
router.get('/:sku', getProductBySku);
router.post('/', createProduct);

export default router;
