const { ObjectId } = require('mongodb');

const { connection } = require('./connection');
const logReport = require('../logger/logReport');

const getAll = async () => {
    const db = await connection();

    const products = await db.collection('products').find().toArray();

    // imprime log de consulta
    logReport('info', 200, 'Consulta: Todos produtos');

    return products;
};

const getById = async (id) => {
    const db = await connection();
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    
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

const update = async (product) => {
    const { id, name, quantity } = product;

    const db = await connection();

    const { modifiedCount } = await db.collection('products')
        .updateOne(
            { _id: ObjectId(id) }, 
            { $set: { name, quantity } },
        );

    if (!modifiedCount) return null;

    // imprime log de cadastro
    logReport('info', 201, `Atualização: Produto ${id}`);

    const productFound = await getById(id);

    return productFound;
};

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
};