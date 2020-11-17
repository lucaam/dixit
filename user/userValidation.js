const Joi = require('joi');

const registrationValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        surname: Joi.string().min(6).required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('user', 'admin')
    });

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data)
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;