const sinon = require('sinon');
const { expect } = require('chai');

const { productService } = require('../../services');
const { productModel } = require('../../models');

describe('Testa rota de produtos', () => {
    let productsMock = [];
    let productMock = {};

    describe('getAll', () => {
        before(() => {
            sinon.stub(productModel, 'getAll').returns(productsMock);
        });

        after(() => {
            productModel.getAll.restore();
        });

        describe('sucesso', () => {
            let products = null;

            before(async () => {
                products = await productService.getAll();

            });

            it ('retorna um array', async () => {
                expect(products).to.be.an('array');
            })
        })
    });

    describe('getById', () => {
        before(() => {
            sinon.stub(productModel, 'getById').returns(productMock);
        });

        after(() => {
            productModel.getById.restore();
        });

        describe('sucesso', () => {
            let product = null;

            before(async () => {
                product = await productService.getById();

            });

            it ('retorna um objeto', async () => {
                expect(product).to.be.an('object');
            })
        })
    });

    describe('create', () => {
        before(() => {
            sinon.stub(productModel, 'create').returns(productMock);

            sinon.stub(productModel, 'getByName').returns({});
        });

        after(() => {
            productModel.create.restore();
            productModel.getByName.restore();
        });

        describe('sucesso', () => {
            let product = null;

            before(async () => {
                product = await productService.create(productMock);

            });

            it ('retorna um objeto', async () => {
                expect(product).to.be.an('object');
            })
        })
    });

    describe('update', () => {
        before(() => {
            sinon.stub(productModel, 'update').returns(productMock);
        });

        after(() => {
            productModel.update.restore();
        });

        describe('sucesso', () => {
            let product = null;

            before(async () => {
                product = await productService.update({});

            });

            it ('retorna um objeto', async () => {
                expect(product).to.be.an('object');
            })
        })
    });
});