const { MongoClient } = require('mongodb');

require('dotenv').config();

const DB_NAME = 'StoreManager';

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/StoreManager`;

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let db = null;

const connection = async () => {
    if (db) return Promise.resolve(db);

    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);

    db = conn.db(DB_NAME);

    return db;
};

module.exports = { connection };