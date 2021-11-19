const Joi = require('joi');

const isProductValid = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        quantity: Joi.number().integer().min(1).required(),
    });

    const { name, quantity } = product;

    const { error } = schema.validate({ name, quantity });
    const ERROR_QUANTITY = '"quantity" must be larger than or equal to 1';
    if (error) {
        error.message = error.message.includes('greater') ? ERROR_QUANTITY : error.message;
        return {
            error: {
                err: {
                    code: 'invalid_data',
                    message: error.message,
                },
            },
        }; 
    } return {};
};

module.exports = isProductValid;