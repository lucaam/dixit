const Joi = require('joi');


const insertValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        picture: Joi.string().min(1).required()
    });

    return schema.validate(data)
}

module.exports.insertValidation = insertValidation;
