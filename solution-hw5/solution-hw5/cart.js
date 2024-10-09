// pasted from price.js and detail.js
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


// create the cart with the given items 
const cart = [
    new Roll("Original", "Sugar-Milk", "1", 2.49),
    new Roll("Walnut", "Vanilla-Milk", "12", 3.49),
    new Roll("Raisin", "Sugar-Milk", "3", 2.99),
    new Roll("Apple", "Keep-Original", "3", 3.49)
];



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
    showCart();
}

//load the cart
window.onload = function() {
    showCart(); 
};