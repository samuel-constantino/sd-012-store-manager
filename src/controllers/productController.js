const rescue = require('express-rescue');

const { productService } = require('../services');

const create = rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const result = await productService.create({ name, quantity });

    return res.status(201).json(result);
});

module.exports = {
    create,
};