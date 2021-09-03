
//user login function
function login() {
    // get data from form
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    console.log(username, password);

    // send data to api
    fetch("https://pure-ocean-21812.herokuapp.com/users/", {
        method: 'PATCH',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
}

//user register function
function register() {
    // get data from form
    let username = document.querySelector('#username').value;
    let first_name = document.querySelector('#first_name').value;
    let last_name = document.querySelector('#last_name').value;
    let cell = document.querySelector('#cell').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let address = document.querySelector('#address').value;
    console.log(username, password);

    // send data to api
    fetch("https://pure-ocean-21812.herokuapp.com/users/", {
        method: 'POST',
        body: JSON.stringify({
            username,
            first_name,
            last_name,
            cell,
            email,
            password,
            address
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
    window.location.href = 'index.html';
}


//admin login function
function adminLogin() {
    // get data from form
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    console.log(username, password);

    // send data to api
    fetch("https://pure-ocean-21812.herokuapp.com/admin/", {
        method: 'PATCH',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
}

//admin register function
function adminReg() {
    // get data from form
    let username = document.querySelector('#username').value;
    let first_name = document.querySelector('#first_name').value;
    let last_name = document.querySelector('#last_name').value;
    let cell = document.querySelector('#cell').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    console.log(username, password);

    // send data to api
    fetch("https://pure-ocean-21812.herokuapp.com/admin/", {
        method: 'POST',
        body: JSON.stringify({
            username,
            first_name,
            last_name,
            cell,
            email,
            password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
}

// display products
let products = [];
let cart = []  


fetch("https://pure-ocean-21812.herokuapp.com/products/")
  .then((response) => response.json())
  .then((json) => {
    products = json.data
    console.log(json.data);
    renderproducts(json.data);
  });

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
        <button onclick="toCart(${product.prod_id})">Cart</button>
      </div>
    `;
  });
}

// add to cart

function toCart(id) {
    // console.log(id);
    let product = products.find(item => {
      return item.prod_id == id
    });
    cart.push(product)
    console.log(cart)
}
