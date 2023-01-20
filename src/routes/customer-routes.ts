import express from 'express';
import customerController from '../controllers/customer-controller';

const router = express.Router();

router.post('/create', customerController.createCustomer);
router.get('/get:customerId', customerController.readCustomer);
router.get('/get', customerController.readAllCustomer);
router.patch('/update', customerController.updateCustomer);
router.delete('/delete', customerController.deleteCustomer);

export = router;
