import { find, remove } from "lodash";

export class Cart {
  constructor() {
    this.items = [];
  }

  add(item) {
    const itemToFind = { product: item.product };

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, { product, quantity }) => {
      return acc + product.price * quantity;
    }, 0);
  }

  checkout() {
    return {
      items: this.items,
      total: this.getTotal(),
    };
  }
}
