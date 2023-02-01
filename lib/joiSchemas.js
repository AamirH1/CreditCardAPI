const Joi = require('joi');

const addNewCreditCardSchema = Joi.object().keys({
    cardHolderName: Joi.string().required(),
    cardNumber: Joi.number().integer().max(9999999999999999999).required(),
    cardLimit: Joi.number().optional()
});


const requesttypeSchemas = {
    addNewCreditCard: addNewCreditCardSchema
}

module.exports = requesttypeSchemas;