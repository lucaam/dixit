const Joi = require('joi');


const matchValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        expectedPlayers: Joi.number().required(),
    });
    return schema.validate(data)
}

module.exports.matchValidation = matchValidation;
