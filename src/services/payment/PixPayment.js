class PixPayment {
  static get method() {
    return "pix";
  }

  constructor({ discountRate = 0.03 } = {}) {
    this.discountRate = discountRate;
  }

  process(order, subtotal) {
    return { approved: true, fee: 0, discount: subtotal * this.discountRate };
  }
}

module.exports = PixPayment;
