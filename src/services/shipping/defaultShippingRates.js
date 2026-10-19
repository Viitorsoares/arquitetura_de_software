const DEFAULT_SHIPPING_RATES = Object.freeze({
  sudeste: { base: 20, perKg: 4 },
  sul: { base: 28, perKg: 5 },
  "centro-oeste": { base: 35, perKg: 6 },
  nordeste: { base: 45, perKg: 7 },
  norte: { base: 60, perKg: 9 }
});

const DEFAULT_FALLBACK_RATE = Object.freeze({ base: 50, perKg: 8 });

module.exports = { DEFAULT_SHIPPING_RATES, DEFAULT_FALLBACK_RATE };
