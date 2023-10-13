import express from 'express';
import officeController from '../controllers/officeController/officeController';
const router = express.Router();

router.get('/', officeController.getAllOffices);

export default router;