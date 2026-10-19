class PaymentService {
  constructor(strategies = []) {
    this.strategies = new Map(strategies.map((strategy) => [strategy.constructor.method, strategy]));
  }

  process(order, subtotal) {
    const strategy = this.strategies.get(order.paymentMethod);

    if (!strategy) {
      throw new Error("Forma de pagamento invalida.");
    }

    return strategy.process(order, subtotal);
  }
}

module.exports = PaymentService;
