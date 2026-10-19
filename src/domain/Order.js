const STATUS = Object.freeze({
  CREATED: "created",
  CONFIRMED: "confirmed",
  WAITING_PAYMENT: "waiting_payment"
});

class Order {
  constructor(id, customer, items, couponCode, paymentMethod, installments) {
    this.id = id;
    this.customer = customer;
    this.items = items;
    this.couponCode = couponCode;
    this.paymentMethod = paymentMethod;
    this.installments = installments;
    this.status = STATUS.CREATED;
    this.createdAt = new Date();
  }

  // ---- consultas sobre o proprio pedido ----

  hasCustomer() {
    return Boolean(this.customer);
  }

  customerHasValidEmail() {
    return this.customer.hasValidEmail();
  }

  hasItems() {
    return Boolean(this.items) && this.items.length > 0;
  }

  hasCoupon(code) {
    return this.couponCode === code;
  }

  isCustomerOfType(type) {
    return this.customer.isOfType(type);
  }

  getShippingRegion() {
    return this.customer.getRegion();
  }

  getCustomerName() {
    return this.customer.name;
  }

  getCustomerEmail() {
    return this.customer.email;
  }

  getCustomerCity() {
    return this.customer.getCity();
  }

  getCustomerState() {
    return this.customer.getState();
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
  }

  getTotalWeight() {
    return this.items.reduce((total, item) => total + item.getTotalWeight(), 0);
  }

  // ---- transicoes de estado ----

  confirm() {
    this.status = STATUS.CONFIRMED;
  }

  awaitPayment() {
    this.status = STATUS.WAITING_PAYMENT;
  }

  isConfirmed() {
    return this.status === STATUS.CONFIRMED;
  }
}

Order.STATUS = STATUS;

module.exports = Order;
