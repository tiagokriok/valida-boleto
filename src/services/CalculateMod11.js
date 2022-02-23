class CalculateMod11 {
  calculateBank(block) {
    const numbers = block.split('').reverse();
    let multiplier = 2;
    const total = numbers.reduce((acc, current) => {
      const sum = Number(current) * multiplier;
      multiplier = multiplier === 9 ? 2 : multiplier + 1;
      return acc + sum;
    }, 0);
    const rest = total % 11;
    const digit = 11 - rest;
    if (digit === 0 || digit === 10 || digit === 11) {
      return 1;
    }
    return digit;
  }

  calculateInvoice(block) {
    const numbers = block.split('').reverse();
    let multiplier = 2;
    const total = numbers.reduce((acc, current) => {
      const sum = Number(current) * multiplier;
      multiplier = multiplier === 9 ? 2 : multiplier + 1;
      return acc + sum;
    }, 0);
    const rest = total % 11;

    if (rest === 0 || rest === 1) {
      return 0;
    }
    if (rest === 10) {
      return 1;
    }
    const digit = 11 - rest;
    return digit;
  }
}

module.exports = new CalculateMod11();
