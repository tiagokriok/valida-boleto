class CalculateMod10 {
  calculate(campo) {
    const codigo = campo.split('').reverse();
    const total = codigo.reduce((acc, current, index) => {
      let soma = Number(current) * (((index + 1) % 2) + 1);
      soma = soma > 9 ? Math.trunc(soma / 10) + (soma % 10) : soma;
      return acc + soma;
    }, 0);
    return Math.ceil(total / 10) * 10 - total;
  }
}

module.exports = new CalculateMod10();
