class OrderValidator {
  constructor(inventoryService) {
    this.inventoryService = inventoryService;
  }

  validate(order) {
    if (!order.hasCustomer()) {
      throw new Error("Cliente obrigatorio.");
    }

    if (!order.customerHasValidEmail()) {
      throw new Error("E-mail do cliente invalido.");
    }

    if (!order.hasItems()) {
      throw new Error("Pedido sem itens.");
    }

    for (const item of order.items) {
      if (!item.hasProduct()) {
        throw new Error("Item sem produto.");
      }

      if (item.getQuantity() <= 0) {
        throw new Error("Quantidade invalida.");
      }

      this.inventoryService.ensureAvailable(item);
    }
  }
}

module.exports = OrderValidator;
