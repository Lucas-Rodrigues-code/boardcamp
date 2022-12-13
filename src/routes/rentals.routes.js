import { Router } from "express";
import { deleteRental, finalizeRent, getRentals, postRental } from "../controllers/rentals.controller.js";
import { validationRental } from "../middlewares/rental.middleware.js";

const router = Router();

router.get('/rentals',getRentals)
router.post('/rentals',validationRental,postRental)
router.post('/rentals/:id/:return',finalizeRent)
router.delete('/rentals/:id',deleteRental)

export default router;