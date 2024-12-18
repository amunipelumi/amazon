import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { myCart, removeFromCart, updateCart } from "../data/cart.js";
import { deliveryOptions as option} from "../data/delivery.js";
import { getCartProduct } from "../data/products.js"
import { priceFormat } from "../utils/price.js";
import { paymentSummary } from './paymentSummary.js';



function formatDate(days){
  const date = dayjs();
  const days_ = date.add(days, 'days');
  const format = days_.format('dddd, MMMM D');
  return format;
};

export function orderSummary(){

  function deliveryOptionsHTML(productId, deliveryType){
    let deliveryHTML = `
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>`;

    for (let i in option){
      if (option.hasOwnProperty(i)){

        const curr = option[i];

        const days = curr.deliveryDays;
        const priceValue = curr.priceInCents;
        const price = priceValue === 0 ? 'Free': `$${priceFormat(priceValue)}`;

        const isChecked = deliveryType['id'] === curr['id'];

        deliveryHTML += `
          <div class="delivery-option">
            <input 
              type="radio" 
              class="delivery-option-input js-delivery-option"
              name="delivery-option-${productId}"
              data-delivery-days="${days}"
              data-item-id="${productId}"
              ${isChecked ? 'checked': ''}
            >
            <div>
              <div class="delivery-option-date js-delivery-option-date">
                ${formatDate(days)}
              </div>
              <div class="delivery-option-price">
                ${price} - Shipping
              </div>
            </div>
          </div>
        `
      };
    };
    return deliveryHTML;
  };

  function cartItems(cart){
    let cartItemHTML = '';

    cart.forEach((cartItem) => {
      const quantity = cartItem.quantity;
      const deliveryType = cartItem.deliveryType;
      const days = deliveryType.deliveryDays;
      const deliveryOptions = deliveryOptionsHTML(
        cartItem.id, deliveryType
      );
      const cartProduct = getCartProduct(cartItem.id);

      cartItemHTML += `
        <div class="
                cart-item-container 
                js-cart-item-container 
                js-cart-item-${cartItem.id}
                "
          >

          <div class="delivery-date js-delivery-date-${cartItem.id}">
            Delivery date: ${formatDate(days)}
          </div>
  
          <div class="cart-item-details-grid">
            <img class="product-image"
              src=${cartProduct.image}
            >
  
            <div class="cart-item-details">
              <div class="product-name">
                ${cartProduct.name}
              </div>

              <div class="product-price">
                $${priceFormat(cartProduct.priceCents)}
              </div>

              <div class="
                    product-quantity 
                    js-product-quantity
                    js-product-quantity-${cartItem.id}"
                  >
                <span>
                  Quantity: <span class="quantity-label">${quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span 
                  class="delete-quantity-link 
                        link-primary 
                        js-delete-quantity
                        js-delete-link-${cartItem.id}"
                  data-cart-item-id="${cartItem.id}">
                  Delete
                </span>
              </div>
            </div>
  
            <div class="delivery-options">${deliveryOptions}</div>
          </div>
        </div>
      `;
    });
    
    document.querySelector('.js-order-summary')
      .innerHTML = cartItemHTML;
    
  };

  cartItems(myCart);

  document.querySelectorAll('.js-delete-quantity')
    .forEach((link) => {link.addEventListener(
      'click', () => {
        let itemId = link.dataset.cartItemId;
        removeFromCart(itemId);
        document.querySelector(`.js-cart-item-${itemId}`)
          .remove();
        orderSummary();
        paymentSummary();
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {option.addEventListener(
      'click', () => {
        const { itemId } = option.dataset;
        const days = option.dataset.deliveryDays;
        updateCart(itemId, days);
        // const format = formatDate(days);
        // document.querySelector(
        //   `.js-delivery-date-${itemId}`
        // ).textContent = `Delivery date: ${format}`;
        // console.log(myCart);
        orderSummary();
        paymentSummary();
      });
    });
};
