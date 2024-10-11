
// cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// get the roll type from URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');


// access roll data 
const rollData = rolls[rollType];

//populate productTitle and image
document.getElementById('productTitle').textContent = `${rollType} Cinnamon Roll`;
const productImage = document.getElementById('productImage');
productImage.src = `assets/products/${rollData.imageFile}`;
productImage.alt = `${rollType} Cinnamon Roll`;
      
// calculate prices and changes 
const basePrice = rollData.basePrice;
document.getElementById('productPrice').textContent = `$${basePrice.toFixed(2)}`;

//removed the function getPrice and replaced it with priceCalculation()

// initialize a roll for the cart 
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
    //added this from cart.js
    priceCalculation() {
        const glazingPrice = glazingOptions[this.glazing];
        const packCalculation = packSizes[this.size];
        return (this.basePrice + glazingPrice) * packCalculation;
    }
}

//changed this function to load and accept changes 
window.onload = function() {
    //set up the options for the dropdown
    populateOptions("glazing", glazingOptions);
    populateOptions("pack-size", packSizes);
    // Get the glazing and pack size dropdown elements
    const glazingSelect = document.getElementById('glazing');
    const packSizeSelect = document.getElementById('pack-size');
    const addToCartButton = document.getElementById('addToCartButton');

    //handle changes 
    glazingSelect.addEventListener('change', glazingChange);
    packSizeSelect.addEventListener('change', packSizeChange);

    // add to cart button event listener 
    addToCartButton.addEventListener('click', () => {
        const selectedGlazing = glazingSelect.value;
        const selectedPackSize = packSizeSelect.value;
        // create new roll 
        const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, basePrice);
        cart.push(newRoll);
        // update local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        // show cart
        console.log('CART', cart);
    });
};

