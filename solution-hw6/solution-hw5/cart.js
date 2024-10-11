

// create the roll class and method to calculate price
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }

  // create a method to calculate individual prices of rolls
  priceCalculation() {
      const glazingPrice = glazingOptions[this.glazing];
      const packCalculation = packSizes[this.size];
      return (this.basePrice + glazingPrice) * packCalculation;
  }
}


// find the cart and set the cart 
let cart = JSON.parse(localStorage.getItem('cart')) || [];
//converts the object into a roll 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
cart = cart.map(item => new Roll(item.type, item.glazing, item.size, item.basePrice));



//  displays cart items in html
function showCart() {
    const entireCart = document.getElementById('cart');
    //edge case when no items in cart 
    let totalPrice = 0;
    //cart should start with being cleared 
    entireCart.innerHTML = ''; 


    // loop through rolls in the cart array
    cart.forEach((roll, cartIndex) => {
        const rollPrice = roll.priceCalculation();

        // construct the HTML that fills in based on rolls
        const cartRollHTML = `
          <div class="cart-item">
            <div class="cart-pic-remove">
              <img class="cart-image" src="assets/products/${rolls[roll.type].imageFile}" alt="${roll.type} cinnamon roll">
              <div class="remove" onclick="remove(${cartIndex})">Remove</div>
            </div>
            <div class="cart-item-title">
              <div class="cart-dot">${roll.type} Cinnamon Roll</div>
              <div class="cart-dot">Glazing: ${roll.glazing}</div>
              <div class="cart-dot">Pack Size: ${roll.size}</div>
            </div>
            <div class="cart-price">$${rollPrice.toFixed(2)}</div>
          </div>
        `;
        // add the roll to the cart html
        entireCart.innerHTML += cartRollHTML;
        // add up the price for total
        totalPrice += rollPrice;
    });

    // change total price 
    document.querySelector('.cost').textContent = "$" + totalPrice.toFixed(2);
}


// Remove item function
function remove(cartIndex) {
    //remove only the one item from cart
    cart.splice(cartIndex,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('CART', cart)
    showCart();
}

//load the cart
window.onload = function() {
    showCart(); 
};