import { deliveryOptions } from "./delivery.js";

export let myCart;
loadLocalStorage();

export function loadLocalStorage(){
  myCart = JSON.parse(localStorage.getItem('myCart')) || {};
};

export function saveCart(){
  localStorage.setItem('myCart', JSON.stringify(myCart));
};

export function addToCart(id, itemQuantity){
  if (myCart[id]){
    myCart[id].quantity += itemQuantity;
  } else {
    myCart[id] = {
      'quantity': itemQuantity,
      'itemDelivery': deliveryOptions['1']
    };
  }
  saveCart();
};

export function updateCart(
  id, 
  newDeliveryDays, 
  option = deliveryOptions
  ){
    for (let i in option){
      if (option.hasOwnProperty(i)){
        const currDelivery = option[i].deliveryDays;
        if (currDelivery === Number(newDeliveryDays)){
          myCart[id].itemDelivery = deliveryOptions[i];
          saveCart();
          return;
        }
      }
    }
  };

export function cartQuantity(){
  let cartQuantity = 0;

  Object.values(myCart).forEach(
    (item) => {
      cartQuantity += item.quantity;
    }
  );
  return cartQuantity;
};

export function removeFromCart(id){
  delete myCart[id];
  saveCart();
  return myCart;
};
