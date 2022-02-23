const { Router } = require('express');
const boletoRouter = require('./boleto');

const routes = Router();

routes.use('/boleto', boletoRouter);

module.exports = routes;
