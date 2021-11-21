const rescue = require('express-rescue');

const { StatusCodes } = require('http-status-codes');
const { productService } = require('../services');
const isProductValid = require('../utils/validations/isProductValid');
const isValidId = require('../utils/validations/isValidId');

const ERROR_ID_FORMAT = {
    err: {
        code: 'invalid_data',
        message: 'Wrong id format',
    },
};

const getAll = rescue(async (_req, res) => {
    const products = await productService.getAll();
    
    return res.status(200).json({ products });
});

const getById = rescue(async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ERROR_ID_FORMAT);

    const product = await productService.getById(id);

    if (!product) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            err: {
                code: 'invalid_data',
                message: 'Wrong id valid',
            },
        });
    } return res.status(StatusCodes.OK).json(product);
});

const create = rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const { error } = isProductValid({ name, quantity });

    if (error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);

    const result = await productService.create({ name, quantity });

    if (result.error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result.error);

    return res.status(StatusCodes.CREATED).json(result);
});

const update = rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const { error } = isProductValid({ name, quantity });

    if (error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);

    const result = await productService.update({ id, name, quantity });

    return res.status(StatusCodes.OK).json(result);
});

const remove = rescue(async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ERROR_ID_FORMAT);

    const productFound = await productService.getById(id);

    if (!productFound) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ERROR_ID_FORMAT);

    const result = await productService.remove(productFound);

    return res.status(StatusCodes.OK).json(result);
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
