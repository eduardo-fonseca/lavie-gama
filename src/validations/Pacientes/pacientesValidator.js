const { validate, Joi } = require("express-validation");

module.exports = validate({
    body: Joi.object({
        nome: Joi.string().min(1).required(),
        email: Joi.string().min(1).email().required(),
        idade: Joi.date().min(1).required()
    })
});