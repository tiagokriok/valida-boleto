const { Router } = require('express');
const BoletoController = require('../controllers/BoletoController');

const boletoRouter = Router();

boletoRouter.get('/:linha', BoletoController.validate);

module.exports = boletoRouter;
