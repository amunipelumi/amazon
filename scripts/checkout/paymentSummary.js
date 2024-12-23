import { myCart, emptyCart } from "../data/cart.js";
import { getCartProduct } from "../data/products.js"
import { priceFormat } from "../utils/price.js";
import { formatDate } from "../utils/date.js";
import { allOrders } from "../order/renderOrders.js";



export function paymentSummary(){
  let totalItemCost = 0;
  let totalShippingCost = 0;
  let totalItemQuantity = 0;
  let totalOrderCost = 0;
  
  let orderItems = [];

  myCart.forEach((cartItem) => {
    const cartProduct = getCartProduct(cartItem.id);
    const itemQuantity = cartItem.quantity;
    const productPrice = cartProduct.priceCents;
    const itemCost = itemQuantity * productPrice
    const itemShipping = cartItem.deliveryType.priceInCents;

    const name = cartProduct.name;
    const image = cartProduct.image;
    const days = cartItem.deliveryType.deliveryDays;
    const date = formatDate(days, 'MMMM D');

    totalItemCost += itemCost;
    totalShippingCost += itemShipping;
    totalItemQuantity += itemQuantity;

    orderItems.unshift({
      name: name,
      image: image,
      quantity: itemQuantity,
      deliveryDate: date
    });
  });
  
  const totalBeforeTax = totalItemCost + totalShippingCost;
  const estimatedTax = totalBeforeTax * 0.1;
  totalOrderCost = totalBeforeTax + estimatedTax;

  const orderDateFmt = formatDate(0, 'MMMM D');

  const myOrder = {
    items: orderItems,
    orderDate: orderDateFmt,
    orderTotal: totalOrderCost,
    orderId: '99055568-2ef4-f9d9-065c-9a16b722ddc1'
  }

  // console.log(myOrder);

  // console.log(`Items(${totalItemQuantity}): $${priceFormat(totalItemCost)}`);
  // console.log(`Shipping & handling: $${priceFormat(totalShippingCost)}`);
  // console.log(`Total before tax: $${priceFormat(totalBeforeTax)}`);
  // console.log(`Estimated tax (10%): $${priceFormat(estimatedTax)}`);
  // console.log(`Order total: $${priceFormat(totalOrderCost)}`);

  const orderCostHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalItemQuantity}):</div>
      <div class="payment-summary-money">$${priceFormat(totalItemCost)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${priceFormat(totalShippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${priceFormat(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${priceFormat(estimatedTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${priceFormat(totalOrderCost)}</div>
    </div>

    <button class="place-order-button js-place-order-button button-primary">
      Place your order
    </button>
  `

  document.querySelector('.js-item-quantity').innerHTML = `
  Checkout (<a class="return-to-home-link js-item-quantity"
               href="index.html">${totalItemQuantity} items
            </a>)
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = orderCostHTML;

  document.querySelector('.js-place-order-button')
    .addEventListener('click', () => {
      if (myOrder.items.length > 0){
        allOrders.unshift(myOrder);
        localStorage.setItem('allOrders', JSON.stringify(allOrders));
        emptyCart();
        window.location.href = 'orders.html';
      };
    });
};
