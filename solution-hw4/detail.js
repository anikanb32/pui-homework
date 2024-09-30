
// get the roll type from URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');


// create the cart and access roll data 
const cart = [];
const rollData = rolls[rollType];

//populate productTitle and image
document.getElementById('productTitle').textContent = `${rollType} Cinnamon Roll`;
const productImage = document.getElementById('productImage');
productImage.src = `assets/products/${rollData.imageFile}`;
productImage.alt = `${rollType} Cinnamon Roll`;
      
// calculate prices and changes 
basePrice = rollData.basePrice;
//duplicate of price.js so not relevant
getPrice()
document.getElementById('productPrice').textContent = `$${rollData.
    basePrice.toFixed(2)}`;


// initialize a roll for the cart 
class Roll {
constructor(rollType, rollGlazing, packSize, basePrice) {
this.type = rollType;
this.glazing = rollGlazing;
this.size = packSize;
this.basePrice = basePrice;
    }
}

// get the initial glazing and then account for changes in selection
const glazingSelect = document.getElementById('glazing');
const packSizeSelect = document.getElementById('pack-size');
glazingSelect.addEventListener('change', glazingChange);
packSizeSelect.addEventListener('change', packSizeChange);


// add elements to cart from glazing, pack size,
// create this roll and add it to the cart 
addToCartButton.addEventListener('click', () => {
    const selectedGlazing = glazingSelect.value;
    const selectedPackSize = packSizeSelect.value;
    const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, 
        rollData.basePrice);
    cart.push(newRoll);
    console.log(cart)
});


