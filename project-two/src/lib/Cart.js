import { find, remove } from "lodash";

const calculatePercentageDiscount = (amount, item) => {
  const { condition, quantity } = item;

  if (condition && quantity >= condition.minimum) {
    return amount.percentage(condition.percentage);
  }

  return Money({ amount: 0 });
};

import Money from "dinero.js";

Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;

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
    return this.items.reduce((acc, item) => {
      const { product, quantity } = item;
      const amount = Money({ amount: product.price * quantity });
      const discount = calculatePercentageDiscount(amount, item);

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal().getAmount();
    const items = this.items;

    return { items, total };
  }

  checkout() {
    const total = this.getTotal().getAmount();
    const items = this.items;

    this.items = [];

    return { items, total };
  }
}
