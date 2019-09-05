const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

//Conexao com o mongoose
module.exports = function() {
    const db = config.get('db')
    mongoose.set('userCreateIndex', true)
    mongoose.connect(db, {useNewUrlParser: true})
    .then(() => winston.info(`Connected to ${db}...`))
};