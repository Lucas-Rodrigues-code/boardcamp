import joi from 'joi';

 const categoriSchema = joi.object({
    name:joi.string().required().min(3).max(20)
})

export default categoriSchema;