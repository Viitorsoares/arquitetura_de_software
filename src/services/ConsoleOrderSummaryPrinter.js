class ConsoleOrderSummaryPrinter {
  constructor(output = (line) => console.log(line)) {
    this.output = output;
  }

  printSummary(summary) {
    const totalItems = summary.items.reduce((total, item) => total + item.quantity, 0);

    this.output("Resumo do pedido");
    this.output(`Cliente: ${summary.customerName}`);
    this.output(`Cidade: ${summary.city}/${summary.state}`);
    this.output(`Itens: ${totalItems}`);
    this.output(`Subtotal: R$ ${summary.subtotal.toFixed(2)}`);
    this.output(`Desconto: R$ ${summary.discount.toFixed(2)}`);
    this.output(`Frete: R$ ${summary.freight.toFixed(2)}`);
    this.output(`Taxas: R$ ${summary.paymentFee.toFixed(2)}`);
    this.output(`Total: R$ ${summary.total.toFixed(2)}`);
  }
}

module.exports = ConsoleOrderSummaryPrinter;
