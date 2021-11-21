const express = require('express');
const { json } = require('body-parser');

const logReport = require('./logger/logReport');
const { productRouter, saleRouter } = require('./routes');

const { errorMidleware } = require('./midlewares');

require('dotenv').config();

const app = express();

app.use(json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
    response.send();
});  

app.use('/products', productRouter);

app.use('/sale', saleRouter);

app.use(errorMidleware);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => logReport('info', 200, `PORT ${PORT}`));