const express = require('express');

const { productController } = require('../controllers');

const route = express.Router();

route.get('/', productController.getAll);

route.get('/:id', productController.getById);

route.post('/', productController.create);

module.exports = route;
