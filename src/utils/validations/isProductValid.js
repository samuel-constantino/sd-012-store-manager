const Joi = require('joi');

const isProductValid = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        quantity: Joi.number().integer().min(1).required(),
    });

    const { name, quantity } = product;

    const { error } = schema.validate({ name, quantity });

    if (error) {
        return {
            error: {
                err: {
                    code: 'invalid_data',
                    message: '"name" length must be at least 5 characters long',
                },
            },
        }; 
    }

    return {};
};

module.exports = isProductValid;