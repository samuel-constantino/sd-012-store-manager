const { productModel } = require('../../models');

const isQuantityValid = async (products) => {
    const productsWithValidQuantity = await Promise.all(
        products.map(async ({ productId, quantity }) => {
            const product = await productModel.getById(productId);

            return product.quantity >= quantity;
        }),
    );

    return productsWithValidQuantity.every((p) => p);
};

module.exports = isQuantityValid;
