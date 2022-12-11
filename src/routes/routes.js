import { Router } from "express";
import categoriRouter from "./categories.routes.js";
import gameROuter from './games.routers.js'

const router = Router();

router.use(categoriRouter);
router.use(gameROuter);
export default router;