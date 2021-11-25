const { productModel } = require('../models');

const getAll = async () => {
    const products = await productModel.getAll();

    return products;
};

const getById = async (id) => {
    const product = await productModel.getById(id);

    return product;
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
    const productFound = await productModel.update(product);

    return productFound;
};

const remove = async (productFound) => {
    const result = await productModel.remove(productFound);

    return result;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};