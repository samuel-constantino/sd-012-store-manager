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

const update = async (sale) => {
    const result = await saleModel.update(sale);

    return result;
};

const remove = async (sale) => {
    const result = await saleModel.remove(sale);

    return result;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
