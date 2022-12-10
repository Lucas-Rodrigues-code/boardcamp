import categoriSchema from '../models/categoriesSchema.js';

export async function addCategoriValidation(req, res, next) {
    const { name } = req.body;

    const { error } = categoriSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    res.locals.name = name;
    next();
}