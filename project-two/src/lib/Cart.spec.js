import { Cart } from "./Cart";

describe("Cart", () => {
  let cart = new Cart();

  const product = {
    title: "Airpods Pro",
    price: 35388,
  };

  const product2 = {
    title: "Airpods Max",
    price: 98745,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  it("should return 0 when getTotal() is executed in a newly created instance", () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it("should multipy quantity and price and return the total amount", () => {
    const item = {
      product: {
        title: "Airpods Pro",
        price: 35388,
      },
      quantity: 2,
    };

    cart.add(item);
    expect(cart.getTotal()).toEqual(70776);
  });

  it("should ensure that a product appear just once in cart", () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product,
      quantity: 1,
    });

    expect(cart.getTotal()).toEqual(35388);
  });

  it("should update total when a product its includes and then removed from card", () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product: product2,
      quantity: 2,
    });

    cart.remove(product);

    expect(cart.getTotal()).toEqual(197490);
  });
});
