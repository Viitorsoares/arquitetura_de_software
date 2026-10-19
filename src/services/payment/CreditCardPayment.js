class CreditCardPayment {
  static get method() {
    return "credit_card";
  }

  constructor({ installmentFeeRate = 0.025 } = {}) {
    this.installmentFeeRate = installmentFeeRate;
  }

  process(order, subtotal) {
    const fee = order.installments > 1 ? subtotal * this.installmentFeeRate : 0;
    return { approved: true, fee, discount: 0 };
  }
}

module.exports = CreditCardPayment;
