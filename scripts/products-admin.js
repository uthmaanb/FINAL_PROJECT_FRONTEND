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
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="products">
        <h3>${product.prod_id}. ${product.name}</h3>
        <h3 class="product-type">${product.prod_type}</h3>
        <h3 class="product-descrip">${product.description}</h3>
        <h3 class="price">R${product.price}</h3>
        <button onclick="toCart(${product.prod_id})">Cart</button>
        <button onclick="deleteProduct(${product.prod_id})">delete</button>
        <button onclick="toggleModal('edit-modal-${product.prod_id}')" id='${product.prod_id}'>edit</button>

        <div id="edit-modal-${product.prod_id}" class="modal">
          <div class="modaler">
            <button onclick="toggleModal('edit-modal-${product.prod_id}')" class="modalbtn" id='${product.prod_id}'>X</button>

            <!-- edit-prod -->
            <div class="editin">
              <form>
                <input required type="text" name="name" id="name${product.prod_id}" placeholder="name"/>
                <input required type="text" name="prod_type" id="prod_type${product.prod_id}" placeholder="prod_type"/>
                <input required type="text" name="description" id="description${product.prod_id}" placeholder="description"/>
                <input required type="text" name="price" id="price${product.prod_id}" placeholder="price"/>
                <button type="submit" class='button-modal trigger' onclick='event.preventDefault()' id='${product.prod_id}'>Submit Information</button>
              </form>
            </div>
          </div>
        </div>


      </div>
    `;
  });
  document
    .querySelectorAll(".trigger")
    .forEach((button) => button.addEventListener("click", editProd));
}

window.addEventListener("click", windowOnClick);

function toggleModalUpdate(e) {
  document.querySelector(".button-modal").id = e.target.id;
}

function windowOnClick(event) {
  if (event.target === document.querySelector(".button-modal")) {
    toggleModalUpdate();
  }
}

// add to cart
function toCart(id) {
  // console.log(id);
  let product = products.find((item) => {
    return item.prod_id == id;
  });
  cart.push(product);
  console.log(cart);
}

// toggle modal function
function toggleModal(modalID) {
  document.getElementById(modalID).classList.toggle("active");
}

// edit function
function editProd(e) {
  console.log(e.target);
  let productid = e.target.id;
  // get data from form
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
  }
}
