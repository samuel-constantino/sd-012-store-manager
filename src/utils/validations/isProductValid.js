const Joi = require('joi');

const isProductValid = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        quantity: Joi.number().integer().min(1).required(),
    });

    const { name, quantity } = product;

    const { error } = schema.validate({ name, quantity });

    if (error) {
        return {
            error: {
                err: {
                    code: 'invalid_data',
                    message: error.message,
                },
            },
        }; 
    }

    return {};
};

module.exports = isProductValid;