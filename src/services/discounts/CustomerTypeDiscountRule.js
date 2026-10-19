/** Desconto percentual por tipo de cliente (vip, employee, ...). */
class CustomerTypeDiscountRule {
  constructor(customerType, rate) {
    this.customerType = customerType;
    this.rate = rate;
  }

  calculate(order, subtotal) {
    return order.isCustomerOfType(this.customerType) ? subtotal * this.rate : 0;
  }
}

module.exports = CustomerTypeDiscountRule;
