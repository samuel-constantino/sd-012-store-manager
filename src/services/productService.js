const { productModel } = require('../models');

const create = async (product) => {
    const result = await productModel.create(product);

    return result;
};

module.exports = { create };