import { loadLocalStorage, myCart, addToCart } from "../../scripts/data/cart.js";
import { orderSummary } from "../../scripts/checkout/orderSummary.js";
import { myProducts } from "../../scripts/data/products.js";



describe('Test suite: orderSummary function', () => {
  const id1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const id2 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

  beforeEach(() => {
    document.querySelector('.js-test-container')
      .innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
      `;
    
    spyOn(localStorage, 'setItem');
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify({});
    });

    loadLocalStorage();

    addToCart(id1, 2);
    addToCart(id2, 1);

    orderSummary();
  });

  it('renders cart container', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${id1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${id2}`).innerText
    ).toContain('Quantity: 1');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${id1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-${id1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-${id2}`)
    ).not.toEqual(null);

    expect(Object.keys(myCart).length).toEqual(1);
    expect(myProducts[id2].id).toEqual(id2);

    document.querySelector('.js-test-container').innerHTML = '';
  });
});
