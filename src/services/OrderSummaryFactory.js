class OrderSummaryFactory {
  create(order, { subtotal, discount, freight, paymentFee, total }) {
    return {
      id: order.id,
      customerName: order.getCustomerName(),
      customerEmail: order.getCustomerEmail(),
      city: order.getCustomerCity(),
      state: order.getCustomerState(),
      items: order.items.map((item) => ({
        productId: item.getProductId(),
        name: item.getProductName(),
        quantity: item.getQuantity(),
        subtotal: item.getSubtotal()
      })),
      subtotal,
      discount: Number(discount.toFixed(2)),
      freight: Number(freight.toFixed(2)),
      paymentFee: Number(paymentFee.toFixed(2)),
      total,
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: order.createdAt
    };
  }
}

module.exports = OrderSummaryFactory;
