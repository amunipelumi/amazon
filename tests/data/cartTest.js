import { loadLocalStorage, addToCart, myCart } from "../../scripts/data/cart.js";
import { deliveryOptions } from "../../scripts/data/delivery.js";



describe('Test suite: Adding item to cart', () => {
  it('adds an existing item', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryType: deliveryOptions['1']
        }
      ]);
    });

    loadLocalStorage();

    const id_ = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    addToCart(id_, 1);

    expect(myCart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(myCart[0].quantity).toEqual(2);
  });

  it('adds a new item', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadLocalStorage();

    const id_ = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    addToCart(id_, 1);

    expect(myCart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(myCart[0].quantity).toEqual(1);
  });
});
