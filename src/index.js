const express = require('express');
const { json } = require('body-parser');

const logReport = require('./logger/logReport');
// const { productRouter, saleRouter } = require('./routes');

require('dotenv').config();

const app = express();

app.use(json());

// app.use('/product', productRouter);

// app.use('/sale', saleRouter);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => logReport('info', 200, `PORT ${PORT}`));