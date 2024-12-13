export let myCart = JSON.parse(localStorage.getItem('myCart')) || {};

export function saveCart(){
  localStorage.setItem('myCart', JSON.stringify(myCart));
};

export function addToCart(id, itemQuantity){
  if (myCart[id]){
    myCart[id].quantity += itemQuantity;
  } else {
    myCart[id] = {
      'quantity': itemQuantity
    };
  }
  saveCart();
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

let cart = [];
