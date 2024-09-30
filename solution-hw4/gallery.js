

const productList = document.getElementById('productList');

// to loop through the rolls and populate the current grid on the gallery page
for (const roll in rolls) {
  
    const product = rolls[roll];

    //I copied the exact original HTML I had for the gallery to populate the 
    // product list and avoid repetition in the HTML
    const productHTML = `
      <a class="linked-prod" href="detail.html?roll=${encodeURIComponent(roll)}">
        <div class="product">
          <img src="assets/products/${product.imageFile}" alt="${roll} Cinnamon Roll">
          <div class="words">
            <span class="product-name">${roll} cinnamon roll</span>
            <div id="light-weight">$${product.basePrice.toFixed(2)}</div>
          </div>
        </div>
      </a>
    `;
    // add to the productList in the innerHTML
    productList.innerHTML += productHTML; 
}