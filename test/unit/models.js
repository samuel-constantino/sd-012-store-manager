const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require('chai');
const sinon = require('sinon');

const conn = require('../../models/connection');
const { productModel } = require('../../models/');

describe("Testa a consulta de todos os produtos", () => {
    let connectionMock;

    before(async () => {
        const DBserver = new MongoMemoryServer();
        const URLmock = await DBserver.getUri();
        const OPTIONS = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        connectionMock = await MongoClient.connect(URLmock, OPTIONS);

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
        MongoClient.connect.restore();
    });

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

    describe("Testa consulta com falha", () => {
        
    });
    
});
