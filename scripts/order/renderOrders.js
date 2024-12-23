import { cartQuantity } from "../data/cart.js";
import { priceFormat } from "../utils/price.js";



export let allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];

function displayEachItem(items){
  let itemHTML = '';

  items.forEach((item) => {
    itemHTML += `
      <div class="product-image-container">
        <img src=${item.image}>
      </div>

      <div class="product-details">
        <div class="product-name">
          ${item.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${item.deliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${item.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=123&productId=456">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return itemHTML;
};

function displayEachOrder(order){
  const itemHTML = displayEachItem(order.items);

  let eachOrderHTML = `
    <div class="order-container">
    
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${order.orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${priceFormat(order.orderTotal)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.orderId}</div>
        </div>
      </div>

      <div class="order-details-grid">${itemHTML}</div>
    </div>
  `;

  return eachOrderHTML;
};

export function displayAllOrders(){
  let allOrdersHTML = '';

  allOrders.forEach((order) => {
    const eachOrder = displayEachOrder(order);
    allOrdersHTML += eachOrder
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity();

  document.querySelector('.js-orders-grid')
    .innerHTML = allOrdersHTML;
};
