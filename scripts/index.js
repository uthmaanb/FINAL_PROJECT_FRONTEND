// all products page
const storage = window.localStorage;

// products url
let base_URL = "https://cryptic-escarpment-42625.herokuapp.com/products/";
// users url
let baseURL = "https://cryptic-escarpment-42625.herokuapp.com/users/";

//user login function
function login() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  console.log(username, password);
  fetch(baseURL, {
    method: "PATCH",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data);
      if (json.data == 0) {
        alert("wrong details");
      } else {
        localStorage.setItem("users", JSON.stringify(json.data));
      }
    });
}

//user register function
function register() {
  // get data from form
  let username = document.querySelector("#username").value;
  let first_name = document.querySelector("#first_name").value;
  let last_name = document.querySelector("#last_name").value;
  let cell = document.querySelector("#cell").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let address = document.querySelector("#address").value;
  console.log(username, password);

  // send data to api
  fetch("https://cryptic-escarpment-42625.herokuapp.com/users/", {
    method: "POST",
    body: JSON.stringify({
      username,
      first_name,
      last_name,
      cell,
      email,
      password,
      address,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  window.location.href = "index.html";
}

//admin login function
function adminLogin() {
  // get data from form
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  console.log(username, password);

  // send data to api
  fetch("https://cryptic-escarpment-42625.herokuapp.com/admin/", {
    method: "PATCH",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

//admin register function
function adminReg() {
  // get data from form
  let username = document.querySelector("#username").value;
  let first_name = document.querySelector("#first_name").value;
  let last_name = document.querySelector("#last_name").value;
  let cell = document.querySelector("#cell").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  console.log(username, password);

  // send data to api
  fetch("https://cryptic-escarpment-42625.herokuapp.com/admin/", {
    method: "POST",
    body: JSON.stringify({
      username,
      first_name,
      last_name,
      cell,
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

// display products
let products = [];
let cart = [];

function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      products = json.data;
      renderproducts(json.data);
    });
}

getData(base_URL);

function renderproducts(products) {
  let productContainer = document.querySelector("#products-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
	  <div class="products">
		<h3>${product.prod_id}. ${product.name}</h3>
		<h3 class="product-type">${product.prod_type}</h3>
		<h3 class="product-discription">${product.description}</h3>
		<h3 class="product-price">${product.price}</h3>
		<button onclick="toCart(${product.prod_id}); showCart()">Cart</button>
	  </div>
	`;
  });
}

// toggle modal function
function toggleModal(modalID) {
  document.getElementById(modalID).classList.toggle("active");
}

// add to cart
function toCart(id) {
  // console.log(id);
  let product = products.find((item) => {
    return item.prod_id == id;
  });
  cart.push(product);
}

// display cart items
function showCart() {
  let container = document.querySelector(".cartmodal");
  container.innerHTML = "";
  console.log(cart);
  cart.forEach((item) => {
    container.innerHTML += `
		<div class="cart-item">
			<div>
				<button onclick="remove(${item.prod_id})">remove</button>
				<h3>Name: ${item.prod_id} ${item.name}</h3>
				<p>Price: R${item.price}</p>
				<p>Description: <q>${item.description}</q></p>
				<p>Type: ${item.prod_type}</p>
			</div>
		</div>
		`;
  });
}

// remove from cart (doesn't remove from cart display)
// function remove(item_id){
//     cart.pop(item_id);
//     console.log(cart)
// }

// remove from cart
function remove(id) {
  let delConfirm = confirm("Are you sure you want to remove this product?");
  if (delConfirm) {
    cart = cart.filter((item) => item.prod_id != id);
    showCart(cart);
    alert("Removed from cart");
  }
}

// search bar
function searchProd() {
  let searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);

  let searchProd = products.filter((products) =>
    products.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(searchProd);

  if (searchProd.length == 0) {
    document.querySelector("#products-container").innerHTML =
      "<h2>Product not found.</h2>";
  } else {
    renderproducts(searchProd);
  }
}

// filter through products using buttons
function productFilter(category) {
  if (category !== "All") {
    let searchPhones = products.filter((products) =>
      products.prod_type.toLowerCase().includes(category.toLowerCase())
    );
    console.log(searchPhones);
    renderproducts(searchPhones);
  } else {
    renderproducts(products);
  }
}
