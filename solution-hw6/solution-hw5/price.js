

// Setting all the prices and multipliers 
const glazingOptions = {
    "Keep-Original": 0.00,
    "Sugar-Milk": 0.00,
    "Vanilla-Milk": 0.50,
    "Double-Chocolate": 1.50
};
  
const packSizes = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
};


// Setting up the options that show on the dropdown on the page
function populateOptions(selectId, options) {
    const select = document.getElementById(selectId);
    for (let key in options) {
        let option = document.createElement("option");
        option.value = key;
        // converting the glazing options into names by removing dash and 
        // replacing it with a space
        option.textContent = key.replace(/-/g, " ");
        // add to the dropdown
        select.appendChild(option);
    }
}

function getPrice() {
    // getting the prices from the page 
    const glazingPrice = glazingOptions[document.getElementById('glazing').value];
    const packCalculation = packSizes[document.getElementById('pack-size').value];
    // calculation of the final price based on 
    const finalPrice = ((basePrice + glazingPrice) * packCalculation);
    // set the price on the page 
    // round the decimal to two places with toFixed(2)
    document.querySelector('.price').textContent = "$" + finalPrice.toFixed(2);
}


// set functions to handle changes from the html

function glazingChange() {
    getPrice();
}

function packSizeChange() {
    getPrice();
}



window.onload = function() {
    // set up the options on the dropdown and anticipate changes 
    populateOptions("glazing", glazingOptions);
    populateOptions("pack-size", packSizes);
    document.getElementById('glazing').onchange = glazingChange; 
    document.getElementById('pack-size').onchange = packSizeChange; 
};


