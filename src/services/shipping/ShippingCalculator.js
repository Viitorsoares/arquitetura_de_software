class ShippingCalculator {
  constructor({ rates, fallbackRate, freeShippingCoupons = [] }) {
    this.rates = rates;
    this.fallbackRate = fallbackRate;
    this.freeShippingCoupons = freeShippingCoupons;
  }

  calculate(order) {
    if (this.freeShippingCoupons.some((code) => order.hasCoupon(code))) {
      return 0;
    }

    const rate = this.rates[order.getShippingRegion()] ?? this.fallbackRate;
    return rate.base + order.getTotalWeight() * rate.perKg;
  }
}

module.exports = ShippingCalculator;
