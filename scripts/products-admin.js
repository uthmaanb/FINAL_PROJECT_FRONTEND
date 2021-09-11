// all products page
const storage = window.localStorage;

// base urls
let baseURL = "https://cryptic-escarpment-42625.herokuapp.com/products/";

// display products
let products = [];
let cart = [];

fetch("https://cryptic-escarpment-42625.herokuapp.com/products/")
  .then((response) => response.json())
  .then((json) => {
    products = json.data;
    console.log(json.data);
    renderproducts(products);
  });

function renderproducts(products) {
  let productContainer = document.querySelector("#products-container");
  productContainer.innerHTML = `
  <div id="addprod-modal" class="modal adprod-modal">
      <button onclick="toggleModal('addprod-modal')" class="modalbtn">X</button>
      
      <div class="addprodmodal">
        <form class='addprodform'>
          <input type="file" id="Image" name="image" required />
          <input required type="text" name="name" id="name" placeholder="name"/>
          <input required type="text" name="prod_type" id="prod_type" placeholder="prod_type"/>
          <input required type="text" name="description" id="description" placeholder="description"/>
          <input required type="text" name="price" id="price" placeholder="price"/>
          <button type="submit" class="button-modal-adprod" onclick="event.preventDefault(); addProduct()">
            Submit Information
          </button>
        </form>
        <img src="" alt="" class="format-img" />
      </div>
    </div>
  `;

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="products">
        <img class="image image-prod" src=${product.image} alt="pic">
        <h3>${product.name}</h3>
        <h3 class="product-type">${product.prod_type}</h3>
        <h3 class="product-descrip">${product.description}</h3>
        <h3 class="price">R${product.price}</h3>
        <div>
          <button onclick="deleteProduct(${product.prod_id})">delete</button>
          <button onclick="toggleModal('edit-modal-${product.prod_id}')" id='${product.prod_id}'>edit</button>
        </div>

        <div id="edit-modal-${product.prod_id}" class="modal">
          <div class="modaler">
            <button onclick="toggleModal('edit-modal-${product.prod_id}')" class="modalbtn" id='${product.prod_id}'>X</button>

            <!-- edit-prod -->
            <div class="editin">
              <form>
                <input type="file" id="Image" name="image" required>
                <input required type="text" name="name" id="name${product.prod_id}" placeholder="name"/>
                <input required type="text" name="prod_type" id="prod_type${product.prod_id}" placeholder="prod_type"/>
                <input required type="text" name="description" id="description${product.prod_id}" placeholder="description"/>
                <input required type="text" name="price" id="price${product.prod_id}" placeholder="price"/>
                <button type="submit" class='button-modal trigger' onclick='event.preventDefault()' id="${product.prod_id}">Submit Information</button>
              </form>
              <img src="" alt="" class="format-img" />
            </div>
          </div>
        </div>
      </div>
    `;
  });
  document
    .querySelectorAll(".trigger")
    .forEach((button) => button.addEventListener("click", editProd));
  document
    .querySelectorAll(`#Image`)
    .forEach((input) => input.addEventListener("change", imageConverter));
}

function toggleModalUpdate(e) {
  document.querySelector(".button-modal").id = e.target.id;
}

function windowOnClick(event) {
  if (event.target === document.querySelector(".button-modal")) {
    toggleModalUpdate();
  }
}

// toggle modal function
function toggleModal(modalID) {
  document.getElementById(modalID).classList.toggle("active");
}

// image converter
function imageConverter() {
  const image = document.querySelector(".format-img");
  const file = document.querySelector(`#Image`).files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to string
      image.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

//Add Product function
function addProduct() {
  // get data from form\
  let f_image = document.querySelector(".format-img").src;
  let name = document.querySelector("#name").value;
  let prod_type = document.querySelector("#prod_type").value;
  let description = document.querySelector("#description").value;
  let price = document.querySelector("#price").value;

  console.log(name, prod_type, description, price);

  // send data to api
  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({
      image: f_image,
      name: name,
      prod_type: prod_type,
      description: description,
      price: price,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.reload();
    });
}

// edit function
function editProd(e) {
  console.log(e.target);
  let productid = e.target.id;
  // get data from form
  let f_image = document.querySelector(".format-img").src;
  let name = document.querySelector(`#name${productid}`).value;
  let prod_type = document.querySelector(`#prod_type${productid}`).value;
  let description = document.querySelector(`#description${productid}`).value;
  let price = document.querySelector(`#price${productid}`).value;

  console.log(name, prod_type, description, price, productid);

  // send data to api
  if (
    (document.querySelector(`#name${productid}`).value.length == 0,
    document.querySelector(`#prod_type${productid}`).value.length == 0,
    document.querySelector(`#description${productid}`).value.length == 0,
    document.querySelector(`#price${productid}`).value.length == 0)
  ) {
    alert("input is empty");
  } else {
    fetch(
      `https://cryptic-escarpment-42625.herokuapp.com/edit-product/${productid}`,
      {
        method: "PUT",
        body: JSON.stringify({
          image: f_image,
          name: name,
          prod_type: prod_type,
          description: description,
          price: price,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
}

// delete function
function deleteProduct(prod_id) {
  console.log(prod_id);
  let delConfirm = confirm("Are you sure you want to delete this product?");
  if (delConfirm) {
    fetch(
      `https://cryptic-escarpment-42625.herokuapp.com/delete-products/${prod_id}`
    );
    window.location.reload();
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

function renderclients(clients) {
  let productContainer = document.querySelector(".usersmodal");
  productContainer.innerHTML = "";

  clients.forEach((client) => {
    productContainer.innerHTML += `
	  <div class="clients">
		<h3>${client.user_id}. ${client.username}</h3>
		<h3 class="product-type">${client.first_name}</h3>
		<h3 class="product-discription">${client.last_name}</h3>
    <h3 class="product-discription">${client.cell}</h3>
		<h3 class="product-price">${client.email}</h3>
    <h3 class="product-price">${client.password}</h3>
    <h3 class="product-price">${client.address}</h3>
	  </div>
	`;
  });
}

fetch("https://cryptic-escarpment-42625.herokuapp.com/users/")
  .then((response) => response.json())
  .then((json) => {
    clients = json.data;
    renderclients(clients);
  });

function logout() {
  admin = [];
  storage.setItem("admin", JSON.stringify(admin));
  window.location.href = "index.html";
}
