// src/routes/index.ts
import { Router, Request, Response } from 'express';

const router: Router = Router();

// Define a simple route
router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

export default router;
