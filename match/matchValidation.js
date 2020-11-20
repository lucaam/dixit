const Joi = require('joi');


const matchValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        expectedPlayers: Joi.number().integer().min(3).required(),
    });
    return schema.validate(data)
}

const joinMatchValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

module.exports = {matchValidation, joinMatchValidation};

