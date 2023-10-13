import { Router } from 'express';
import officeRouter from './officeRouter';

const router = Router();

router.use("/offices", officeRouter);

export default router;