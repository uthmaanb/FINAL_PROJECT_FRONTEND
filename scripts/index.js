
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
            password,
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

fetch("https://pure-ocean-21812.herokuapp.com/products/")
  .then((response) => response.json())
  .then((json) => {
    renderproducts(json.data);
  });

function renderproducts(products) {
  let productContainer = document.querySelector("#products-container");
  productContainer.innerHTML = "";

  products.forEach((products) => {
    productContainer.innerHTML += `
      <div class="products">
        <h3>${products[0]}. ${products[1]}</h3>
        <h3 class="product-name">${products[4]}</h3>
        <h3 class="product-discription">${products[2]}</h3>
        <h3 class="product-price">${products[3]}</h3>
        <h3 class="quantity">${products[5]}</h3>
      </div>
    `;
  });
}
