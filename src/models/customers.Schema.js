import joi from 'joi';
import joiDate from "@joi/date";

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().min(10).max(11),
    cpf: joi.string().required().min(11),
    birthday: joi.extend(joiDate).date().format("YYYY-MM-DD").required(),
  });

  export default customerSchema;