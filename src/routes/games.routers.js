import { Router } from "express";
import {getGames, postGames} from '../controllers/game.controller.js'
import { validationGame } from "../middlewares/game.middleware.js";

const router = Router();

router.get('/games',getGames )
router.post('/games', validationGame, postGames)

export default router;