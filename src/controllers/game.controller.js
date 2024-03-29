
import { connection } from '../database/database.js'
export async function getGames(req, res) {
    const { name } = req.query;

    try {
        if (name) {
            const games = await connection.query(
              `SELECT games.*, categories.name AS "categoryName" 
                  FROM games JOIN categories ON games."categoryId" = categories.id
                  WHERE LOWER (games.name) LIKE $1;`,
              [`${name.toLowerCase()}%`]
            );
            return res.status(200).send(games.rows);
          }
      
          const games = await connection.query(
            `SELECT games.*, categories.name AS "categoryName" 
                FROM games JOIN categories ON games."categoryId" = categories.id;`
          );
          res.status(200).send(games.rows);
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function postGames(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } =/*  req.body */ res.locals.games 

    

   
    try{
        await connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
              VALUES ($1, $2, $3, $4, $5);`,
            [name, image, stockTotal, categoryId, pricePerDay]
          );
          res.sendStatus(201);

    } catch(err){
        res.sendStatus(500).send(err.message)
    }
}