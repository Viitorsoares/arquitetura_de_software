class CouponDiscountRule {
  constructor(couponCode, rate) {
    this.couponCode = couponCode;
    this.rate = rate;
  }

  calculate(order, subtotal) {
    return order.hasCoupon(this.couponCode) ? subtotal * this.rate : 0;
  }
}

module.exports = CouponDiscountRule;
