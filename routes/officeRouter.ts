import express from 'express';
import officeController from '../controllers/officeController/officeController';
const router = express.Router();

router.get('/', officeController.getAllOffices);
router.get('/address', officeController.getAddresses);
router.get('/:officeId', officeController.getOffice);
router.get('/atms/:atmId', officeController.getAtm);

export default router;