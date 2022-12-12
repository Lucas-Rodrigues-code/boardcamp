import { Router } from "express";
import categoriRouter from "./categories.routes.js";
import gameROuter from './games.routers.js'
import customersRouter from './customers.routes.js'

const router = Router();

router.use(categoriRouter);
router.use(gameROuter);
router.use(customersRouter);
export default router;