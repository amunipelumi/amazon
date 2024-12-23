import { deliveryOptions as option } from "./delivery.js";

export let myCart;
loadLocalStorage();

export function loadLocalStorage(){
  myCart = JSON.parse(localStorage.getItem('myCart')) || [];
};

export function saveCart(){
  localStorage.setItem('myCart', JSON.stringify(myCart));
};

export function addToCart(id, newQuantity){
  let itemExist;

  myCart.forEach((product) => {
    if (product.id === id){
      itemExist = product;
    }
  });
  
  if (itemExist){
    itemExist.quantity += newQuantity;
  } else {
    myCart.unshift({
      'id': id,
      'quantity': newQuantity,
      'deliveryType': option['1']
    });
  }

  saveCart();
};

export function updateCart(id, newDays, op_ = option){
  for (let i in op_){
    if (op_.hasOwnProperty(i)){
      const curr = op_[i].deliveryDays;
      if (curr === Number(newDays)){
        myCart.forEach((item) => {
          if (item.id === id){
            item.deliveryType = op_[i];
            saveCart();
            return;
          }
        })
      }
    }
  }
};

export function cartQuantity(){
  let cartQuantity = 0;

  myCart.forEach((item) => {
      cartQuantity += item.quantity;
    }
  );
  return cartQuantity;
};

export function removeFromCart(id){
  let newCart = [];
  myCart.forEach((item) => {
    if (item.id !== id){
      newCart.unshift(item);
    }
  });
  myCart = newCart;
  saveCart();
};

export function emptyCart(){
  myCart = [];
  saveCart();
};
