import { Router } from "express";
import { getCustomers, getCustomersId, postCustomers, putCustomers } from "../controllers/customer.controller.js";
import { customerValidation, putCustomerValidation } from "../middlewares/costumers.middleware.js";



const router = Router();

router.get('/customers',getCustomers)
router.get('/customers/:id',getCustomersId)
router.post('/customers',customerValidation, postCustomers)
router.put('/customers/:id',putCustomerValidation,putCustomers)

export default router;