export class Cart {
  constructor() {
    this.itens = [];
  }

  getTotal() {
    return this.itens.reduce((acc, { product, quantity }) => {
      return acc + product.price * quantity;
    }, 0);
  }

  add(item) {
    this.itens.push(item);
  }
}
