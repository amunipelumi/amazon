import { myCart, removeFromCart } from "../data/cart.js";
import { myProducts } from "../data/products.js";
import { priceFormat } from "./utils/price.js";


function cartItems(cart){
  let cartItemHTML = '';

  for (let id in cart){
    if (cart.hasOwnProperty(id)){

      const quantity = cart[id].quantity;
      const cartItem = myProducts[id];

      cartItemHTML += `
        <div 
          class="cart-item-container js-cart-item-${id}">
          <div class="delivery-date">
            Delivery date: Wednesday, June 15
          </div>
  
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${cartItem.image}">
  
            <div class="cart-item-details">
              <div class="product-name">
                ${cartItem.name}
              </div>
              <div class="product-price">
                $${priceFormat(cartItem.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span 
                  class="delete-quantity-link link-primary js-delete-quantity"
                  data-cart-item-id="${id}">
                  Delete
                </span>
              </div>
            </div>
  
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
  
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                  name="delivery-option-${id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input"
                  name="delivery-option-${id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                  name="delivery-option-${id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    }
  }
  document.querySelector('.js-order-summary')
    .innerHTML = cartItemHTML;
};

cartItems(myCart);

document.addEventListener('click', (event) => {
  if (event.target.matches('.js-delete-quantity')){
    let itemId = event.target.dataset.cartItemId;
    let cart = removeFromCart(itemId);
    cartItems(cart);
  };
});
