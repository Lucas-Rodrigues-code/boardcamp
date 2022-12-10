import { Router } from "express";
import categoriRouter from "./categories.routes.js";

const router = Router();

router.use(categoriRouter);
export default router;