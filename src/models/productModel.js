const { connection } = require('./connection');
const logReport = require('../logger/logReport');

const getById = async (id) => {
    const db = await connection();

    const product = await db.collection('products').findOne({ _id: id });

    if (product) {
        const { _id } = product;
        // imprime log de consulta
        logReport('info', 200, `Consulta: Produto ${Object(_id).toString()}`);
    }

    return product;
};

const getByName = async (name) => {
    const db = await connection();

    const product = await db.collection('products').findOne({ name });

    if (product) {
        const { _id } = product;
        // imprime log de consulta
        logReport('info', 200, `Consulta: Produto ${Object(_id).toString()}`);
    }

    return product;
};

const create = async (product) => {
    const db = await connection();

    const { insertedId: id } = await db.collection('products').insertOne({ ...product });

    if (!id) return null;

    // imprime log de cadastro
    logReport('info', 201, `Cadastro: Produto ${id}`);

    const productFound = await getById(id);

    return productFound;
};

module.exports = {
    getById,
    getByName,
    create,
};