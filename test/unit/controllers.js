const sinon = require('sinon');
const { expect } = require('chai');

const { productService } = require('../../services');
const { productController } = require('../../controllers');

describe('Testa rota de produtos', () => {
    describe('getAll', () => {
        describe('sucesso', () => {
          const response = {};
          const request = {};
      
          before(() => {
              request.body = {};
      
              response.status = sinon.stub().returns(response);
      
              response.json = sinon.stub().returns();
      
              sinon.stub(productService, 'getAll').resolves(true);
          });
      
          after(() => {
              productService.getAll.restore();
          });
      
          it('retorna status com o código 200', async () => {
              await productController.getAll(request, response);
      
              expect(response.status.calledWith(200)).to.be.equal(true);
          });
        });
      });

    describe('getById', () => {
        describe('sucesso', () => {
            const response = {};
            const request = {};
        
            before(() => {
                request.params = { id:  '619e5367f60ad53e962a0a97'};
        
                response.status = sinon.stub().returns(response);
        
                response.json = sinon.stub().returns();
        
                sinon.stub(productService, 'getById').resolves(true);
            });
        
            after(() => {
                productService.getById.restore();
            });
        
            it('retorna status com o código 200', async () => {
                await productController.getById(request, response);
        
                expect(response.status.calledWith(200)).to.be.equal(true);
            });
        });
    });

    describe('create', () => {
        describe('sucesso', () => {
          const response = {};
          const request = {};
      
          before(() => {
              request.body = {
                  name: 'Produto Teste',
                  quantity: 1,
              };
      
              response.status = sinon.stub().returns(response);
      
              response.json = sinon.stub().returns();
      
              sinon.stub(productService, 'create').resolves(true);
          });
      
          after(() => {
              productService.create.restore();
          });
      
          it('retorna status com o código 201', async () => {
              await productController.create(request, response);
      
              expect(response.status.calledWith(201)).to.be.equal(true);
          });
        });
    });

    describe('update', () => {
        describe('sucesso', () => {
            const response = {};
            const request = {};
        
            before(() => {
                request.params = { id:  '619e5367f60ad53e962a0a97'};

                request.body = { name: 'Produto teste', quantity: 1 };
        
                response.status = sinon.stub().returns(response);
        
                response.json = sinon.stub().returns();
        
                sinon.stub(productService, 'update').resolves(true);
            });
        
            after(() => {
                productService.update.restore();
            });
        
            it('retorna status com o código 200', async () => {
                await productController.update(request, response);
        
                expect(response.status.calledWith(200)).to.be.equal(true);
            });
        });
    });

    describe('remove', () => {
        describe('sucesso', () => {
            const response = {};
            const request = {};
        
            before(() => {
                request.params = { id:  '619e5367f60ad53e962a0a94'};
        
                response.status = sinon.stub().returns(response);
        
                response.json = sinon.stub().returns();
        
                sinon.stub(productService, 'remove').resolves(true);
                sinon.stub(productService, 'getById').resolves(true);
            });
        
            after(() => {
                productService.remove.restore();
                productService.getById.restore();
            });
        
            it('retorna status com o código 200', async () => {
                await productController.remove(request, response);
        
                expect(response.status.calledWith(200)).to.be.equal(true);
            });
        });
    });


});