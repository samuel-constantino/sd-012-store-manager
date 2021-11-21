const { productModel } = require('../models');

const getAll = async () => {
    const products = await productModel.getAll();

    return products;
};

const getById = async (id) => {
    const products = await productModel.getById(id);

    return products;
};

const create = async (product) => {
    const productFound = await productModel.getByName(product.name);
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

const update = async (product) => {
    const result = await productModel.update(product);

    return result;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};