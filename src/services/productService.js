const { productModel } = require('../models');

const create = async (product) => {
    const productFound = productModel.getByName(product.name);

    if (productFound) {
        return {
            error: {
                err: {
                    code: 'invalid_data',
                    message: 'Product already exists',
                },
            },
        };
    }

    const result = await productModel.create(product);

    return result;
};

module.exports = { create };