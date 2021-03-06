const AppError = require('../errors/AppError');
const CalculateMod10 = require('./CalculateMod10');
const CalculateMod11 = require('./CalculateMod11');

class ValidateTituloService {
  validate(linhaDigitavel) {
    const barCode =
      linhaDigitavel.substring(0, 4) +
      linhaDigitavel.substring(32, 47) +
      linhaDigitavel.substring(4, 9) +
      linhaDigitavel.substring(10, 20) +
      linhaDigitavel.substring(21, 31);

    const value = linhaDigitavel.substring(37, 47);
    const amount = `${Number(value.substr(0, value.length - 2))}.${value.slice(
      -2,
    )}`;

    const campos = [
      {
        aux: linhaDigitavel.substring(0, 9),
        verificador: linhaDigitavel.substring(9, 10),
      },
      {
        aux: linhaDigitavel.substring(10, 20),
        verificador: linhaDigitavel.substring(20, 21),
      },
      {
        aux: linhaDigitavel.substring(21, 31),
        verificador: linhaDigitavel.substring(31, 32),
      },
    ];

    if (
      !campos.every(
        campo =>
          CalculateMod10.calculate(campo.aux) === Number(campo.verificador),
      )
    ) {
      throw new AppError('Digito Verificador inválido Modulo 10', 400);
    }

    const dvMod11 = barCode[4];

    const block = barCode.substring(0, 4) + barCode.substring(5);

    if (!(CalculateMod11.calculateBank(block) === Number(dvMod11))) {
      throw new AppError('Digito Verificador inválido Modulo 11', 400);
    }

    return {
      barCode,
      amount,
    };
  }
}

module.exports = new ValidateTituloService();
