let productHTML = '';
// let cartQuantity = 0;

for (let id in myProducts) {
  if (myProducts.hasOwnProperty(id)){
    productHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${myProducts[id].image}"
        >
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${myProducts[id].name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${myProducts[id].rating.stars*10}.png"
        >
        <div class="product-rating-count link-primary">
          ${myProducts[id].rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(myProducts[id].priceCents/100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button 
        class="
        add-to-cart-button 
        button-primary 
        js-add-to-cart"
        data-product-id="${id}">
        Add to Cart
      </button>
    </div>
    `;
  }
}

document.querySelector('.js-products-grid')
  .innerHTML = productHTML;

document.querySelectorAll('.js-add-to-cart').forEach(
  (buttonElem) => {buttonElem.addEventListener(
    'click', () => {
      const id = buttonElem.dataset.productId;
      const quantity = 1;

      if (myCart[id]){
        myCart[id].quantity += quantity;
      } else {
        myCart[id] = {
          'name': myProducts[id].name, 
          'image': myProducts[id].image,
          'price': myProducts[id].priceCents,
          'quantity': quantity
        };
      }
      
      let cartQuantity = 0;

      Object.values(myCart).forEach(
        (item) => {
          cartQuantity += item.quantity;
        }
      );

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

    }
  )}
);
