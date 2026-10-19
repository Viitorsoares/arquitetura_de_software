class HighValueOrderDiscountRule {
  constructor(threshold, amount) {
    this.threshold = threshold;
    this.amount = amount;
  }

  calculate(order, subtotal) {
    return subtotal > this.threshold ? this.amount : 0;
  }
}

module.exports = HighValueOrderDiscountRule;
