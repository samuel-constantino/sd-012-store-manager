const { ObjectId } = require('mongodb');

const isValidId = (id) => {
    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id) { return true; }
        return false;
    }
    return false;
};

module.exports = isValidId;