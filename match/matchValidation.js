const Joi = require('joi');


const matchValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        expectedPlayers: Joi.number().integer().min(3).max(12).required(),
    });
    return schema.validate(data)
}

const joinMatchValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate(data)
}

module.exports = {matchValidation, joinMatchValidation};

