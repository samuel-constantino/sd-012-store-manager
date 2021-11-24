const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require('chai');
const sinon = require('sinon');

const { OPTIONS, DB_NAME } = require('../../models/connection');
const { productModel, saleModel } = require('../../models/');

describe('Testa rota de produtos', () => {
    let connectionMock;
    
    before(async () => {
        const DBserver = new MongoMemoryServer();
        const urlMock = await DBserver.getUri();
        const optionsMock = OPTIONS;

        connectionMock = await MongoClient.connect(urlMock, optionsMock);

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
        MongoClient.connect.restore();
    });

    describe("Testa a consulta de todos os produtos", () => {
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

    describe("Testa a consulta de produto por id", () => {
        let db = null;
        let product = null;

        before(async () => {
            db = connectionMock.db(DB_NAME);

            product = {
                _id: '619e5367f60ad53e962a0a97',
                name: 'Produto de teste',
                quantity: 1,
            };

            await db.collection('products').insertOne(product);
        });

        after(() => {
            db.collection('products').drop()
        });

        describe ("Testa consulta com sucesso", async () => {
            let productFound = null;
            const { _id } = product;

            before(async () => {
                productFound = await productModel.getById(_id);
            });
            
            it ("O retorno deve ser um objeto", () => {
               expect(productFound).to.be.an('object');
            });
        });
    });
});
