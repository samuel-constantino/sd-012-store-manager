const { saleModel } = require('../models');

const getAll = async () => {
    const sales = await saleModel.getAll();

    return sales;
};

const getById = async (id) => {
    const sale = await saleModel.getById(id);

    return sale;
};

const create = async (products) => {
    const result = await saleModel.create(products);

    return result;
};

module.exports = {
    getAll,
    getById,
    create,
};
