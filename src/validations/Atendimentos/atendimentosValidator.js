const { validate, Joi } = require("express-validation");

module.exports = validate({
    body: Joi.object({
        paciente_id: Joi.number().min(1).required(),
        data_atendimento: Joi.date().min(1).required(),
        observacao: Joi.string().min(1).required()
    })
});