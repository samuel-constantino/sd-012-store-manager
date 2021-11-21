const express = require('express');

const { productController } = require('../controllers');

const route = express.Router();

route.get('/', productController.getAll);

route.get('/:id', productController.getById);

route.post('/', productController.create);

route.put('/:id', productController.update);

route.delete('/:id', productController.remove);

module.exports = route;
