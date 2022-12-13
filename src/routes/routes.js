import { Router } from "express";
import categoriRouter from "./categories.routes.js";
import gameROuter from './games.routers.js'
import customersRouter from './customers.routes.js'
import rentalsRouter from './rentals.routes.js'

const router = Router();

router.use(categoriRouter);
router.use(gameROuter);
router.use(customersRouter);
router.use(rentalsRouter);
export default router;

