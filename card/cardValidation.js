const Joi = require('joi');


const insertValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        picture: Joi.string().min(4).required()
    });

    return schema.validate(data)
}

module.exports.insertValidation = insertValidation;