import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { myCart, removeFromCart, updateCart } from "../data/cart.js";
import { deliveryOptions } from "../data/delivery.js";
import { myProducts } from "../data/products.js";
import { priceFormat } from "../utils/price.js";
import { paymentSummary } from './paymentSummary.js';



function formatDate(days){
  const date = dayjs();
  const days_ = date.add(days, 'days');
  const format = days_.format('dddd, MMMM D');
  return format;
};

export function orderSummary(){

  function deliveryOptionsHTML(productId, itemDelivery){
    let deliveryHTML = `
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>`;

    for (let i in deliveryOptions){
      if (deliveryOptions.hasOwnProperty(i)){

        const current = deliveryOptions[i];

        const days = current.deliveryDays;
        const priceValue = current.priceInCents;
        const price = priceValue === 0 ? 'Free': `$${priceFormat(priceValue)}`;

        const isChecked = itemDelivery['id'] === current['id'];

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

    for (let i in cart){
      if (cart.hasOwnProperty(i)){

        const cartItem = myProducts[i];
        const quantity = cart[i].quantity;
        const itemDelivery = cart[i].itemDelivery;
        const days = itemDelivery.deliveryDays;
        const deliveryOptions = deliveryOptionsHTML(
          i, itemDelivery
        );

        cartItemHTML += `
          <div class="
                cart-item-container 
                js-cart-item-container 
                js-cart-item-${i}
                "
            >
            <div class="delivery-date js-delivery-date-${i}">
              Delivery date: ${formatDate(days)}
            </div>
    
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${cartItem.image}"
              >
    
              <div class="cart-item-details">
                <div class="product-name">
                  ${cartItem.name}
                </div>

                <div class="product-price">
                  $${priceFormat(cartItem.priceCents)}
                </div>

                <div class="
                      product-quantity 
                      js-product-quantity
                      js-product-quantity-${i}"
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
                          js-delete-link-${i}"
                    data-cart-item-id="${i}">
                    Delete
                  </span>
                </div>
              </div>
    
              <div class="delivery-options">${deliveryOptions}</div>
            </div>
          </div>
        `;
      }
    }
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
