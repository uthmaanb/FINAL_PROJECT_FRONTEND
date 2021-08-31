// display products
let products = [];

fetch("https://pure-ocean-21812.herokuapp.com/products/")
  .then((response) => response.json())
  .then((json) => {
      products = json.data
      console.log(json.data);
      renderproducts(products);
  });

function renderproducts(products) {
  let productContainer = document.querySelector("#products-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="products">
        <h3>${product.prod_id}. ${product.name}</h3>
        <h3 class="product-type">${product.prod_type}</h3>
        <h3 class="product-descrip">${product.description}</h3>
        <h3 class="price">${product.price}</h3>
      </div>
    `;
  });
}