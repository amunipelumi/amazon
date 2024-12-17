import { loadLocalStorage, addToCart, myCart } from "../../scripts/data/cart.js";
import { myProducts } from "../../scripts/data/products.js";
import { deliveryOptions } from "../../scripts/data/delivery.js";



describe('Test suite: Adding item to cart', () => {
  it('adds an existing item', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify({
        "e43638ce-6aa0-4b85-b27f-e1d07eb678c6": {
          'quantity': 1,
          'itemDelivery': deliveryOptions['1']
        }
      });
    });

    loadLocalStorage();

    const id_ = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    addToCart(id_, 1);

    const itemNum = Object.keys(myCart).length;
    expect(itemNum).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(myCart[id_].quantity).toEqual(2);
    expect(myProducts[id_].id).toEqual(id_);
  });

  it('adds a new item', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify({});
    });

    loadLocalStorage();

    const id_ = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    addToCart(id_, 1);

    const itemNum = Object.keys(myCart).length;
    expect(itemNum).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(myCart[id_].quantity).toEqual(1);
    expect(myProducts[id_].id).toEqual(id_);
  });
});
