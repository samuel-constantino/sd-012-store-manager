const express = require('express');

const { saleController } = require('../controllers');

const route = express.Router();

route.get('/', saleController.getAll);

route.get('/:id', saleController.getById);

route.post('/', saleController.create);

module.exports = route;
