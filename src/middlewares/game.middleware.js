import gameSchema from "../models/game.Schema.js";
import { connection } from '../database/database.js';

export async function validationGame(req, res, next) {
    const { name, categoryId } = req.body;
    const games = req.body;
    const { error } = gameSchema.validate(req.body, { abortEarly: false });

    try {
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            res.status(400).send(errors);
            return;
        }

        const category = await connection.query(
            "SELECT * FROM categories WHERE id = $1",
            [categoryId]
        );
        if (!category.rows[0]) {
            res.status(400).send({ message: "Categoria não existe" });
        }

        const exist = await connection.query(
            "SELECT * FROM games WHERE name = $1",
            [name]
        );
        if (exist.rows[0]) {
            return res.status(409).send({ error: "Nome do game já existe!" });
        }


    } catch (error) {
        res.status(500)
    }

    res.locals.games = games;
    next()

}