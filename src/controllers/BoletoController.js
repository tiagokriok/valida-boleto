const AppError = require('../errors/AppError');
const ValidateConvenio = require('../services/ValidateConvenio');
const ValidateTitulo = require('../services/ValidateTitulo');
const ExpirationFactor = require('../services/ExpirationFactor');

class BoletoController {
  async validate(request, response) {
    const { linha } = request.params;

    const linhaDigitavel = linha.replace(/( |-|\.)/g, '');

    if (/^[0-9]{48}$/.test(linhaDigitavel)) {
      const { barCode, amount, dueDate } =
        ValidateConvenio.validate(linhaDigitavel);

      return response.json({ barCode, amount, expirationDate: dueDate });
    }
    if (/^[0-9]{47}$/.test(linhaDigitavel)) {
      const { barCode, amount } = ValidateTitulo.validate(linhaDigitavel);

      const expirationDate = ExpirationFactor.calculateDueDate(linhaDigitavel);

      return response.json({
        barCode,
        amount,
        expirationDate,
      });
    }

    throw new AppError('Linha Digitavel inválida', 400);
  }
}

module.exports = new BoletoController();
