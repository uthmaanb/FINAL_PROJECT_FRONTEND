// all products page
const storage = window.localStorage;

let user = storage.getItem("users");
console.log(`user id: ${user}`);

// products url
let base_URL = "https://cryptic-escarpment-42625.herokuapp.com/products/";
// users url
let baseURL = "https://cryptic-escarpment-42625.herokuapp.com/users/";

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

// fetch data from localstorage
if (storage["cart"]) {
  cart = JSON.parse(storage.getItem("cart"));
}

// if (storage["user"]) {
//   vueuser = JSON.parse(storage.getItem("user"));
//   console.log(vueuser);
// }

// render products
function renderproducts(products) {
  let productContainer = document.querySelector("#products-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
	  <div class="products">
    <img class="image image-prod" src=${product.image} alt="pic">
		<h3>${product.name}</h3>
		<h3 class="product-type">${product.prod_type}</h3>
		<h3 class="product-discription">${product.description}</h3>
		<h3 class="product-price">${product.price}</h3>
		<button onclick="toCart(${product.prod_id})">Cart</button>
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
  let product = products.find((item) => {
    return item.prod_id == id;
  });

  // adding user id to product array in cart !!!!!!!!!!!!!!!!!!!
  product = { ...product, user: user };

  cart.push(product);
  console.log(cart);
  storage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

// display cart items
if (storage.getItem("cart")) {
  let cart = JSON.parse(window.localStorage.getItem("cart"));
  console.log(cart);
  let container = document.querySelector(".cartmodal");
  container.innerHTML = "";
  cart.forEach((item) => {
    if (item.user == user) {
      container.innerHTML += `
      <div class="cart-item">
        <div>
          <button class='rmvbtn' onclick='event.preventDefault()' id='${item.user}'>remove</button>
          <h3>Name: ${item.prod_id} ${item.name}</h3>
          <p>Price: R${item.price}</p>
          <p>Description: ${item.description}</p>
          <p>Type: ${item.prod_type}</p>
        </div>
      </div>
      `;
    }
  });

  // calculate total price
  let userCart = cart.filter((item) => item.user == user);
  console.log(userCart);

  let totalPrice = userCart.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);

  console.log(totalPrice);
  container.innerHTML += `<h3>Your total is: ${totalPrice} </h3>`;

  // for remove button to run function
  document
    .querySelectorAll(".rmvbtn")
    .forEach((button) => button.addEventListener("click", remove));
}

// remove function
function remove(e) {
  let cart = JSON.parse(window.localStorage.getItem("cart"));
  let userid = e.target.id;
  cart.forEach((item) => {
    if (item.user == userid) {
      cart.splice(item, 1);
      window.localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    }
  });
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

// user profile
function viewProfile() {
  console.log(`user id: ${storage.getItem("users")}`);
  fetch(
    `https://cryptic-escarpment-42625.herokuapp.com/edit-user/${storage.getItem(
      "users"
    )}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let user = data.data;
      console.log(user.user_id);

      let contain = document.querySelector(".usermodal");
      contain.innerHTML = "";
      contain.innerHTML = `
      <div class="vewuser">
        <p>username: ${user.username}</p>
        <p>first_name: ${user.first_name}</p>
        <p>last_name: ${user.last_name}</p>
        <p>cell: ${user.cell}</p>
        <p>email: ${user.email}</p>
        <p>password: ${user.password}</p>
      </div>`;
    });
}

function logout() {
  user = [];
  storage.setItem("users", JSON.stringify(user));
  window.location.href = "index.html";
}
