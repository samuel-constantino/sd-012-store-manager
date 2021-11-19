const { productModel } = require('../models');

const create = async (product) => {
    const productFound = productModel.getByName(product.name);

    if (productFound) return { error: { message: 'Nome inválido. Já existe' } };

    const result = await productModel.create(product);

    return result;
};

module.exports = { create };