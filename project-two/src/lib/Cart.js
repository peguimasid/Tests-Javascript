import Money from "dinero.js";
import { find, remove } from "lodash";

Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;

const calculatePercentageDiscount = (amount, item) => {
  const { condition, quantity } = item;

  if (condition && quantity >= condition.minimum) {
    return amount.percentage(condition.percentage);
  }

  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, item) => {
  const { condition, quantity } = item;

  const isEven = quantity % 2 === 0;

  if (condition?.quantity && quantity > condition.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }

  return Money({ amount: 0 });
};

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
      const { product, quantity, condition } = item;
      const amount = Money({ amount: product.price * quantity });

      let discount = Money({ amount: 0 });

      if (condition?.minimum) {
        discount = calculatePercentageDiscount(amount, item);
      }

      if (condition?.quantity) {
        discount = calculateQuantityDiscount(amount, item);
      }

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
