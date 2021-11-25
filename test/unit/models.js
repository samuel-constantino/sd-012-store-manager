const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require('chai');
const sinon = require('sinon');

const { OPTIONS, DB_NAME } = require('../../models/connection');
const { productModel } = require('../../models/');

describe('Testa rota de produtos', () => {
    let productMock = null;
    let connectionMock;
    
    before(async () => {
        productMock = {
            _id: ObjectId('619e5367f60ad53e962a0a97'),
            name: 'Produto de teste',
            quantity: 1,
        };

        // Mock da função MongoClient.connect

        const DBserver = new MongoMemoryServer();
        const urlMock = await DBserver.getUri();
        const optionsMock = OPTIONS;

        connectionMock = await MongoClient.connect(urlMock, optionsMock);

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
        MongoClient.connect.restore();
    });

    describe("getAll", () => {
        describe("Testa consulta com sucesso", () => {
            let products;
            before(async () => {
                products = await productModel.getAll();

            });
    
            it("Retorna um array", () => {
                expect(products).to.be.an('array');
    
            });
    
            it("O array retornado deve incluir apenas objetos", () => {
                products.forEach((product) => {
                    expect(product).to.be.an('object');
                });
            });
    
            it("Estes objetos devem incluir apenas propriedades válidas", () => {
                let properties = ['_id', 'name', 'quantity'];
                
                products.forEach((product) => {
                    properties.forEach((property) => {
                        expect(product).to.be.an.property(property);
                    });
                });
            });
        });
    });

    describe("getById", () => {
        describe ("Testa consulta com sucesso", async () => {
            let db = null;
            let productFound = null;

            before(async () => {
                db = connectionMock.db(DB_NAME);

                await db.collection('products').insertOne(productMock);

                const { _id } = productMock;

                productFound = await productModel.getById(_id);
            });

            after(() => {
                db.collection('products').drop()
            });

            it ("O retorno deve ser um objeto", () => {
                expect(productFound).to.be.an('object');
            });
        });
    });

    describe("getByName", () => {
        describe ("Testa consulta com sucesso", async () => {
            let db = null;
            let productFound = null;

            before(async () => {
                db = connectionMock.db(DB_NAME);

                await db.collection('products').insertOne(productMock);

                const { name } = productMock;

                productFound = await productModel.getByName(name);
            });

            after(() => {
                db.collection('products').drop()
            });

            it ("O retorno deve ser um objeto", () => {
                expect(productFound).to.be.an('object');
            });
        });
    });
});
