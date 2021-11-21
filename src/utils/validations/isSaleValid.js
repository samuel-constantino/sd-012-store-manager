const isValidId = require('./isValidId');

const isSaleValid = (products) => {
    if (!products.length) return false;
    
    let isValid = true;
     products.forEach(({ productId, quantity }) => {
        if (!isValidId(productId) || typeof quantity !== 'number' || quantity <= 0) isValid = false;
    });
    
    return isValid;
};

module.exports = isSaleValid;