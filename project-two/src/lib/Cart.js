export class Cart {
  constructor() {
    this.itens = [];
  }

  getTotal() {
    return this.itens.reduce((acc, { product, quantity }) => {
      acc += product.price * quantity;
      return acc;
    }, 0);
  }

  add(item) {
    this.itens.push(item);
  }
}
