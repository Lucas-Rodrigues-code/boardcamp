import rentalSchema from '../models/rentals.Schema.js';

export async function validationRental(req, res, next) {

    const rental = req.body;
    const validation = rentalSchema.validate(req.body, { abortEarly: false });

    res.locals.rental = rental
    res.locals.validation = validation
    next()

}