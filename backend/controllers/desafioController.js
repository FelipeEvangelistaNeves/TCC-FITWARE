const { Desafio } = require('../models');
const LoggerMessages = require('../loggerMessages');

const dataDesafio = async () => {
    const Desafios = await Desafio.findAll();
    return Desafios;
}

module.exports = {
    dataDesafio,
};