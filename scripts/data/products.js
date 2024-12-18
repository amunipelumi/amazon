import { products as dt } from "./allproducts.js";
import { priceFormat } from '../utils/price.js'



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

  getPrice(){
    return `$${priceFormat(this.priceCents)}`;
  }

  getExtraInfo(){
    return '';
  }
};

class Clothing extends Product {
  constructor(eachProduct){
    super(eachProduct);
    this.sizeChartLink = eachProduct.sizeChartLink;
  }

  getExtraInfo(){
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}

export const products = dt.map((eachProduct) => {
  if (eachProduct.type === 'clothing'){
    return new Clothing(eachProduct);
  }
  return new Product(eachProduct);
});

// console.log(products);

export function getCartProduct(id){
  let cartProduct;

  products.forEach((product) => {
    if (product.id === id){
      cartProduct = product;
    }
  });

  return cartProduct;
};
