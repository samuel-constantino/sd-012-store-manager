const rescue = require('express-rescue');

const { StatusCodes } = require('http-status-codes');
const { productService } = require('../services');
const isProductValid = require('../utils/validations/isProductValid');

const create = rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const { error } = isProductValid({ name, quantity });

    if (error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);

    const result = await productService.create({ name, quantity });

    return res.status(201).json(result);
});

module.exports = {
    create,
};
