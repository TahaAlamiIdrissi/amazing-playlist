const Joi = require('@hapi/joi');


const registerValidation = (data) => {
    const Schema = {
        name: Joi.string()
                 .required(),
        email: Joi.string()
                  .required()
                  .min(5),
        password: Joi.string()
                     .required()
                     .min(4)          
    };
    return Joi.validate(data,Schema);
};
const loginValidation = (data) => {
    const Schema = {
        email: Joi.string()
                  .required()
                  .min(5),
        password: Joi.string()
                     .required()
                     .min(4)          
    };
    return Joi.validate(data,Schema);
};
module.exports = {
    registerValidation,
    loginValidation
}