const AppError = require('../errors/AppError');
const CalculateMod10 = require('./CalculateMod10');
const CalculateMod11 = require('./CalculateMod11');

class ValidateConvenioService {
  validate(linhaDigitavel) {
    const value =
      linhaDigitavel.substring(4, 11) + linhaDigitavel.substring(12, 16);
    const amount = `${Number(value.substring(0, 9))}.${value.slice(-2)}`;

    const dueDateLine =
      linhaDigitavel.substring(20, 23) + linhaDigitavel.substring(24, 29);

    const year = Number(dueDateLine.substring(0, 5));
    const month = Number(dueDateLine.substring(4, 6));
    const day = Number(dueDateLine.substring(6, 8));

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

    if (year > 1970) {
      if (month > 0 && month <= 12) {
        if (day > 0 && day <= 31) {
          const dueDate = new Date(`${year}-${month}-${day}`);
          return {
            barCode: linhaDigitavel,
            amount,
            dueDate,
          };
        }
      }
    }

    return {
      barCode: linhaDigitavel,
      amount,
    };
  }
}

module.exports = new ValidateConvenioService();
