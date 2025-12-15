import { Router } from 'express';
import { productRouter } from '../modules/products/routes/products.routes';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/products', productRouter);

export { router };