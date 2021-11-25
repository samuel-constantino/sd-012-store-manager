const express = require('express');
const rescue = require('express-rescue');

const { productController } = require('../controllers');

const route = express.Router();

route.get('/', rescue(productController.getAll));

route.get('/:id', rescue(productController.getById));

route.post('/', rescue(productController.create));

route.put('/:id', rescue(productController.update));

route.delete('/:id', rescue(productController.remove));

module.exports = route;
