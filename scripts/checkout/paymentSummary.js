import { myCart } from "../../data/cart.js";
import { myProducts } from "../../data/products.js";
import { priceFormat } from "../utils/price.js";


export function paymentSummary(){
  let totalItemCost = 0;
  let totalShippingCost = 0;

  for (let i in myCart){
    if (myCart.hasOwnProperty(i)){
      const itemQuantity = myCart[i].quantity;
      const productPrice = myProducts[i].priceCents;
      const itemCost = itemQuantity*productPrice
      const itemShipping = myCart[i].itemDelivery.priceInCents

      totalItemCost += itemCost;
      totalShippingCost += itemShipping;
    }
  }
  console.log('All item cost: ', priceFormat(totalItemCost));
  console.log('All shipping cost: ', priceFormat(totalShippingCost));
};
