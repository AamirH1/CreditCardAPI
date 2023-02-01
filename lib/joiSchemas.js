const Joi = require('joi');

const addNewCreditCardSchema = Joi.object().keys({
    cardHoldername: Joi.string().required(),
    cardNumber: Joi.number().integer().max(9999999999999999999),
    cardLimit: Joi.number().optional()
});

const requesttypeSchemas = {
    addNewCreditCard: addNewCreditCardSchema
}

module.exports = requesttypeSchemas;