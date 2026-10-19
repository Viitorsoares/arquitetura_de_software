const ProductRepository = require("./repositories/ProductRepository");
const OrderRepository = require("./repositories/OrderRepository");
const Logger = require("./utils/Logger");

const OrderService = require("./services/OrderService");
const OrderValidator = require("./services/OrderValidator");
const InventoryService = require("./services/InventoryService");
const NotificationService = require("./services/NotificationService");
const OrderSummaryFactory = require("./services/OrderSummaryFactory");
const ConsoleOrderSummaryPrinter = require("./services/ConsoleOrderSummaryPrinter");

const DiscountCalculator = require("./services/discounts/DiscountCalculator");
const CustomerTypeDiscountRule = require("./services/discounts/CustomerTypeDiscountRule");
const CouponDiscountRule = require("./services/discounts/CouponDiscountRule");
const HighValueOrderDiscountRule = require("./services/discounts/HighValueOrderDiscountRule");

const ShippingCalculator = require("./services/shipping/ShippingCalculator");
const { DEFAULT_SHIPPING_RATES, DEFAULT_FALLBACK_RATE } = require("./services/shipping/defaultShippingRates");

const PaymentService = require("./services/payment/PaymentService");
const PixPayment = require("./services/payment/PixPayment");
const CreditCardPayment = require("./services/payment/CreditCardPayment");
const BoletoPayment = require("./services/payment/BoletoPayment");

function createDefaultDiscountCalculator() {
  return new DiscountCalculator([
    new CustomerTypeDiscountRule("vip", 0.08),
    new CustomerTypeDiscountRule("employee", 0.15),
    new CouponDiscountRule("TECH10", 0.1),
    new HighValueOrderDiscountRule(8000, 250)
  ]);
}

function createDefaultShippingCalculator() {
  return new ShippingCalculator({
    rates: DEFAULT_SHIPPING_RATES,
    fallbackRate: DEFAULT_FALLBACK_RATE,
    freeShippingCoupons: ["FRETEGRATIS"]
  });
}

function createDefaultPaymentService() {
  return new PaymentService([new PixPayment(), new CreditCardPayment(), new BoletoPayment()]);
}

function createOrderService(overrides = {}) {
  const logger = overrides.logger ?? new Logger();
  const productRepository = overrides.productRepository ?? new ProductRepository();
  const inventoryService = overrides.inventoryService ?? new InventoryService(productRepository);

  return new OrderService({
    validator: overrides.validator ?? new OrderValidator(inventoryService),
    discountCalculator: overrides.discountCalculator ?? createDefaultDiscountCalculator(),
    shippingCalculator: overrides.shippingCalculator ?? createDefaultShippingCalculator(),
    paymentService: overrides.paymentService ?? createDefaultPaymentService(),
    inventoryService,
    orderRepository: overrides.orderRepository ?? new OrderRepository(),
    notificationService: overrides.notificationService ?? new NotificationService(logger),
    summaryFactory: overrides.summaryFactory ?? new OrderSummaryFactory(),
    summaryPrinter: overrides.summaryPrinter ?? new ConsoleOrderSummaryPrinter(),
    logger
  });
}

module.exports = createOrderService;
