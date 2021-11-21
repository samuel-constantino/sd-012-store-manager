const rescue = require('express-rescue');

const { StatusCodes } = require('http-status-codes');
const { saleService } = require('../services');
const isSaleValid = require('../utils/validations/isSaleValid');

const ERROR_SALE_VALID = {
    err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
    },
};

const getAll = rescue(async (_req, res) => {
    const products = await saleService.getAll();
    
    return res.status(200).json({ products });
});

const create = rescue(async (req, res) => {
    const products = req.body;

    if (!isSaleValid(products)) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ERROR_SALE_VALID);
    }

    const result = await saleService.create(products);

    return res.status(StatusCodes.OK).json(result);
});

module.exports = {
    getAll,
    create,
};
