import { myProducts } from "./products.js";

export const myCart = {};

export function addToCart(id, itemQuantity){
  if (myCart[id]){
    myCart[id].quantity += itemQuantity;
  } else {
    myCart[id] = {
      'name': myProducts[id].name, 
      'image': myProducts[id].image,
      'price': myProducts[id].priceCents,
      'quantity': itemQuantity
    };
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
