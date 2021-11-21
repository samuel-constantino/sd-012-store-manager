const { ObjectId } = require('mongodb');

const { connection } = require('./connection');
const logReport = require('../logger/logReport');

const getAll = async () => {
    const db = await connection();

    const sales = await db.collection('sales').find().toArray();

    // imprime log de consulta
    logReport('info', 200, 'Consulta: Todas vendas');

    return sales;
};

const getById = async (id) => {
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    
    if (sale) {
        const { _id } = sale;
        // imprime log de consulta
        logReport('info', 200, `Consulta: Venda ${Object(_id).toString()}`);
    }

    return sale;
};

const create = async (products) => {
    const db = await connection();

    const { insertedId: id } = await db.collection('sales').insertOne({
        itensSold: products,
    });
    
    if (!id) return null;

    // // imprime log de cadastro
    logReport('info', 201, `Cadastro: Venda ${id}`);

    const saleFound = await getById(id);

    return saleFound;
};

const update = async (sale) => {
    const { id, products } = sale;

    const db = await connection();

    const { modifiedCount } = await db.collection('sales')
        .updateOne(
            { _id: ObjectId(id) }, 
            { $set: { itensSold: products } },
        );

    if (!modifiedCount) return null;

    // imprime log de cadastro
    logReport('info', 201, `Atualização: Venda ${id}`);

    const saleFound = await getById(id);

    return saleFound;
};

const remove = async (sale) => {
    const { _id } = sale;
    const db = await connection();
    const { result } = await db.collection('sales').deleteOne({ _id: ObjectId(_id) });
    
    if (result.ok) {
        // imprime log de consulta
        logReport('info', 200, `Remoção: Venda ${Object(_id).toString()}`);

        return sale;
    }

    return null;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
