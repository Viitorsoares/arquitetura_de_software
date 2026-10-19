class InventoryService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  ensureAvailable(item) {
    const product = this.productRepository.findById(item.getProductId());

    if (!product) {
      throw new Error(`Produto ${item.getProductId()} nao encontrado.`);
    }

    if (!product.hasStock(item.getQuantity())) {
      throw new Error(`Estoque insuficiente para ${product.name}.`);
    }
  }

  reserve(items) {
    for (const item of items) {
      this.productRepository.updateStock(item.getProductId(), item.getQuantity());
    }
  }
}

module.exports = InventoryService;
