const winston = require('winston');
require('express-async-errors');

module.exports = function() {
    //log erros file
        winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'}));

        process.on('uncaughtException', (ex) => {
            throw ex;
        });

        winston.add(winston.transports.File, { filename: 'logfile.log'});
};