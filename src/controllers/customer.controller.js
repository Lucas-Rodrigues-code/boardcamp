import { connection } from '../database/database.js'

export async function getCustomers(req, res) {
    const { cpf } = req.query

    try {
        if (cpf) {
            const customers = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1;`, [`${cpf}%`]);
            res.send(customers.rows);
            return;
        }
        const customers = await connection.query('SELECT * FROM customers;')
        res.send(customers.rows)

    } catch (err) {
        res.sendStatus(500)
    }
}

export async function getCustomersId(req, res) {
    const { id } = req.params;

    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [id]);

        if (!customer.rows[0]) {
            res.status(404).send({ error: "Cliente não encontrado" });
            return;
        }

        res.status(200).send(customer.rows[0]);
        return;
    } catch (err) {
        res.status(500)
    }
}

export async function postCustomers(req, res) {

    const { name, phone, cpf, birthday } = res.locals.costumer
  
    
    try {
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
        [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        
        res.sendStatus(500);
    }

}

export async function putCustomers(req, res) {
    const { id } = req.params;
    
    const { name, phone, cpf, birthday } = res.locals.costumer
  
    
    try {
        await connection.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
            [name, phone, cpf, birthday, id]);
          res.sendStatus(200);
    } catch (err) {
        
        res.sendStatus(500);
    }

}