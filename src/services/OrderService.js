class OrderService {
  constructor({
    validator,
    discountCalculator,
    shippingCalculator,
    paymentService,
    inventoryService,
    orderRepository,
    notificationService,
    summaryFactory,
    summaryPrinter,
    logger
  }) {
    this.validator = validator;
    this.discountCalculator = discountCalculator;
    this.shippingCalculator = shippingCalculator;
    this.paymentService = paymentService;
    this.inventoryService = inventoryService;
    this.orderRepository = orderRepository;
    this.notificationService = notificationService;
    this.summaryFactory = summaryFactory;
    this.summaryPrinter = summaryPrinter;
    this.logger = logger;
  }

  process(order) {
    this.logger.info(`Iniciando processamento do pedido ${order.id}.`);

    this.validator.validate(order);

    const subtotal = order.getSubtotal();
    const freight = this.shippingCalculator.calculate(order);
    const payment = this.paymentService.process(order, subtotal);
    const discount = this.discountCalculator.calculate(order, subtotal) + payment.discount;
    const paymentFee = payment.fee;

    const total = Number((subtotal - discount + freight + paymentFee).toFixed(2));

    if (total <= 0) {
      throw new Error("Total do pedido invalido.");
    }

    this.inventoryService.reserve(order.items);

    if (payment.approved) {
      order.confirm();
    } else {
      order.awaitPayment();
    }

    const summary = this.summaryFactory.create(order, { subtotal, discount, freight, paymentFee, total });

    this.orderRepository.save(summary);

    if (order.isConfirmed()) {
      this.notificationService.sendOrderConfirmation(order.customer, order.id, total);
    } else {
      this.logger.warn(`Pedido ${order.id} aguardando pagamento.`);
    }

    this.summaryPrinter.printSummary(summary);

    return summary;
  }
}

module.exports = OrderService;
