const { createLogger, format, transports } = require('winston');

const x9 = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.json(),
    ),
    transports: [
        // escrever erros em log de erros
        new transports.File({ filename: './logger/error.log', level: 'error' }),
        // escrever erros e outras informações em log de informações
        new transports.File({ filename: './logger/info.log', level: 'info' }),
    ],
});

// caso o ambiente de execução não seja 'produção', imprimir logs no terminal.
if (process.env.NODE_ENV !== 'production') {
    x9.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple(),
        ),
    }));
}

module.exports = x9;