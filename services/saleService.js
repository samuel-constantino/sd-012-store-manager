const { saleModel } = require('../models');
const isQuantityValid = require('../utils/validations/isQuantityValid');

const ERROR_INVALID_QUANTITY = {
    err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
    },
};

const getAll = async () => {
    const sales = await saleModel.getAll();

    return sales;
};

const getById = async (id) => {
    const sale = await saleModel.getById(id);

    return sale;
};

const create = async (products) => {
    if (!isQuantityValid(products)) return ERROR_INVALID_QUANTITY;
    
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
