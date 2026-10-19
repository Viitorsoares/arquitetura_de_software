class BoletoPayment {
  static get method() {
    return "boleto";
  }

  process() {
    return { approved: false, fee: 0, discount: 0 };
  }
}

module.exports = BoletoPayment;
