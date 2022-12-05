import { Cart } from './Cart';

describe('Cart', () => {
  let cart = new Cart();
  beforeEach(() => {
    cart = new Cart();
  });

  it('should return 0 when getTotal() is executed in a newly created instance', () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it('should multipy quantity and price and return the total amount', () => {
    const item = {
      product: {
        title: 'Airpods Pro',
        price: 35388,
      },
      quantity: 2,
    };

    cart.add(item);
    expect(cart.getTotal()).toEqual(70776);
  });
});
