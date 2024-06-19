import { Router } from 'express';
import { viewCart, deleteProductFronCart, addToCart, updateCart } from '../controllers/CartController';

const router = Router();

router.get('/', viewCart);
router.post('/add', addToCart);
router.post('/update', updateCart);
router.post('/delete', deleteProductFronCart);

export default router;
