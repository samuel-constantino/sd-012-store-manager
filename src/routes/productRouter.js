const express = require('express');

const { productController } = require('../controllers');

const route = express.Router();

route.post('/', productController.create);

module.exports = route;
