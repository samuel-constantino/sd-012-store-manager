const rescue = require('express-rescue');

const { StatusCodes } = require('http-status-codes');
const { saleService } = require('../services');
const isSaleValid = require('../utils/validations/isSaleValid');
const isValidId = require('../utils/validations/isValidId');

const ERROR_SALE_VALID = {
    err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
    },
};

const ERROR_NOT_FOUND = {
    err: {
        code: 'not_found',
        message: 'Sale not found',
    },
};

const ERROR_ID_FORMAT = {
    err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
    },
};

const getAll = rescue(async (_req, res) => {
    const sales = await saleService.getAll();
    
    return res.status(200).json({ sales });
});

const getById = rescue(async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) return res.status(StatusCodes.NOT_FOUND).json(ERROR_NOT_FOUND);

    const sale = await saleService.getById(id);

    if (!sale) {
        return res.status(StatusCodes.NOT_FOUND).json(ERROR_NOT_FOUND);
    }
    
    return res.status(StatusCodes.OK).json(sale);
});

const create = rescue(async (req, res) => {
    const products = req.body;

    if (!isSaleValid(products)) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ERROR_SALE_VALID);
    }

    const result = await saleService.create(products);

    if (result.err) return res.status(StatusCodes.NOT_FOUND).json(result);

    return res.status(StatusCodes.OK).json(result);
});

const update = rescue(async (req, res) => {
    const { id } = req.params;
    const products = req.body;

    if (!isSaleValid(products)) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ERROR_SALE_VALID);
    }

    const result = await saleService.update({ id, products });

    return res.status(StatusCodes.OK).json(result);
});

const remove = rescue(async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ERROR_ID_FORMAT);

    const saleFound = await saleService.getById(id);

    if (!saleFound) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ERROR_ID_FORMAT);

    const result = await saleService.remove(saleFound);

    return res.status(StatusCodes.OK).json(result);
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
