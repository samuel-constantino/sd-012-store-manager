const { saleModel } = require('../models');

const getAll = async () => {
    const sales = await saleModel.getAll();

    return sales;
};

const create = async (products) => {
    const result = await saleModel.create(products);

    return result;
};

module.exports = {
    getAll,
    create,
};
