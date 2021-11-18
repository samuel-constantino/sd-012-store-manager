const x9 = require('./logger');

const logReport = (type, code, message) => {
    try {
        if (type === 'error') {
            return x9.error({ code, message });
        } 

        if (type === 'info') return x9.info({ code, message });
    } catch (e) {
        return x9.error({ code: 500, message: `ERRO AO IMPRIMIR LOGGER - ${e.message}` });
    }
};

module.exports = logReport;