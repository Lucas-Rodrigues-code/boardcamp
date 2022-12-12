import customerSchema from '../models/customers.Schema.js';
import { connection } from '../database/database.js'


export async function customerValidation(req, res, next) {

    const { cpf } = req.body;
    const customer = req.body;

    const { error } = customerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const cpfExist = await connection.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if (cpfExist.rows[0]) {
            res.status(409).send({ message: "CPF já existe!" });
            return;
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }

    res.locals.costumer = customer;
    next()

}



export async function putCustomerValidation(req, res, next) {
    
    const { cpf } = req.body;
    const customer = req.body;

    const { error } = customerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const cpfExist = await connection.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if (cpfExist.rows[0]) {
            res.status(409).send({ message: "CPF já existe!" });
            return;
        }
    } catch (err) {
        res.sendStatus(500);
    }

    res.locals.costumer = customer;
    next()

}