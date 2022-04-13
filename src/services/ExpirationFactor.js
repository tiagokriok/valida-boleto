class ExpirationFactor {
  calculateDueDate(linhaDigitavel) {
    const dataBoleto = new Date('1997-10-7');

    const factorDate = linhaDigitavel.substring(33, 37);

    dataBoleto.setDate(dataBoleto.getDate() + Number(factorDate));
    dataBoleto.setTime(
      dataBoleto.getTime() +
        dataBoleto.getTimezoneOffset() -
        3 * 60 * 60 * 1000,
    );

    return dataBoleto;
  }
}

module.exports = new ExpirationFactor();
