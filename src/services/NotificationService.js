class NotificationService {
  constructor(logger) {
    this.logger = logger;
  }

  sendOrderConfirmation(customer, orderId, total) {
    this.logger.info(
      `Notificacao enviada para ${customer.email}: pedido ${orderId} confirmado. Total: R$ ${total.toFixed(2)}.`
    );
  }
}

module.exports = NotificationService;
