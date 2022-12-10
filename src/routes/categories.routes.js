import { Router } from "express";


import { getCategories } from '../controllers/categori.controller.js'
import { addCategoriValidation } from '../middlewares/categori.middlewares.js'
import { PostCategories } from '../controllers/categori.controller.js'

const router = Router();

router.get('/categories', getCategories)
router.post('/categories', addCategoriValidation, PostCategories)

export default router;