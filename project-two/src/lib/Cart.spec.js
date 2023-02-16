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

  describe("getTotal()", () => {
    it("should return 0 when getTotal() is executed in a newly created instance", () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
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
      expect(cart.getTotal().getAmount()).toEqual(70776);
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

      expect(cart.getTotal().getAmount()).toEqual(35388);
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

      expect(cart.getTotal().getAmount()).toEqual(197490);
    });
  });

  describe("checkout()", () => {
    it("should return an object with the total and the list of items", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it("should clear the cart when checkout() method is called", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();
      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe("summary()", () => {
    it("should return an object with the total and the list of items when is called", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });
  });

  describe("special conditions", () => {
    it("should apply discount percentage when selected amount of is above minimum", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it("should apply quantity discount for even quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it("should apply quantity discount for odd quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });
  });
});
