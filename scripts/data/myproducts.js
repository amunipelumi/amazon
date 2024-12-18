import { myProducts as dt } from './allproducts.js'

// for (let key in myProducts) {
//     // Check if the key is a direct property
//     // if (myProducts.hasOwnProperty(key)) { 
//     //     console.log(`${key}: --`);
//     // }
//     console.log(`${key}: ${myObject[key]}`);
// }

class Product {
  constructor(eachProduct){
    this.id = eachProduct.id;
    this.name = eachProduct.name;
    this.image = eachProduct.image;
    this.rating = eachProduct.rating;
    this.priceCents = eachProduct.priceCents;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
};

const products = Object.values(dt).map((eachProduct) => {
  return new Product(eachProduct);
});

const product1 = products[0];
console.log(typeof product1);
console.log(product1.getStarsUrl());
