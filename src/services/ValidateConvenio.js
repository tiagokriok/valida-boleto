const AppError = require('../errors/AppError');
const CalculateMod10 = require('./CalculateMod10');
const CalculateMod11 = require('./CalculateMod11');

class ValidateConvenioService {
  validate(linhaDigitavel) {
    const value = linhaDigitavel.substr(4, 7) + linhaDigitavel.substr(12, 4);
    const amount = `${Number(value.substr(0, 9))}.${value.slice(-2)}`;
    const dueDate = linhaDigitavel.substr(20, 3) + linhaDigitavel.substr(24, 5);

    const dvg = Number(linhaDigitavel[2]);

    const campos = [
      {
        aux: linhaDigitavel.substring(0, 11),
        verificador: linhaDigitavel.substring(11, 12),
      },
      {
        aux: linhaDigitavel.substring(12, 23),
        verificador: linhaDigitavel.substring(23, 24),
      },
      {
        aux: linhaDigitavel.substring(24, 35),
        verificador: linhaDigitavel.substring(35, 36),
      },
      {
        aux: linhaDigitavel.substring(36, 47),
        verificador: linhaDigitavel.substring(47, 48),
      },
    ];

    if (dvg === 6 || dvg === 7) {
      if (
        !campos.every(
          campo =>
            CalculateMod10.calculate(campo.aux) === Number(campo.verificador),
        )
      ) {
        throw new AppError('Digito Verificador inválido Modulo 10', 400);
      }
    } else if (dvg === 8 || dvg === 9) {
      if (
        !campos.every(
          campo =>
            CalculateMod11.calculateInvoice(campo.aux) ===
            Number(campo.verificador),
        )
      ) {
        throw new AppError('Digito Verificador inválido Modulo 11', 400);
      }
    } else {
      throw new AppError('Boleto inválido', 400);
    }

    return {
      barCode: linhaDigitavel,
      amount,
      dueDate,
    };
  }
}

module.exports = new ValidateConvenioService();
