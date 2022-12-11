import { connection } from '../database/database.js'
export async function getCategories(req, res) {
    try {
        const categorias = await connection.query('SELECT * FROM categories;')
        res.send(categorias.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}


export async function PostCategories(req, res) {
     const  name  = res.locals.name; 
    try {
        const existCategory = await connection.query(`SELECT * FROM categories WHERE name=$1;`, [name])
        if (existCategory.rows[0]) {
            res.status(409).send({ message: "Essa categoria já existe." });
            return;
        }
        await connection.query("INSERT INTO categories (name) VALUES ($1);", [name])
        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500).send(err.message)
    }
}