let data = [];

async function fetchData() {
  await fetch("./db.json")
    .then((resp) => resp.json())
    .then((json) => data.push(json));
  init(data[0].products);
}

fetchData();

let containerProducts = document.querySelector(".container-products");

function init(products) {
  containerProducts = document.querySelector(".container-products");

  containerProducts.innerHTML = ``;

  products.map((product) => {
    containerProducts.innerHTML += `
      <div id="${product.id}" class="product">
          <div class="product-image">
              <img
                  src="${product.image}"
                  alt="${product.name}"
              />
          </div>
          <h4 class="product-title">${product.name}</h4>
          <p class="product-desc">
          ${product.description}
          </p>
          <p class="product-price">$${+product.price}</p>
          <div class="product-btn">
              <button id="${product.id}" class="btn-add-card">Agregar</button>
          </div>
    </div>
      `;
    categoryFilterShow();
    btnShow();
  });
}

const dataSearch = document.querySelector("[data-input-search]");

dataSearch.addEventListener("keyup", searchProducts);

let productSellers = [];

let productLess = [];

function searchProducts(e) {
  const dataValue = data[0].products.filter((letter) =>
    letter.name.toLowerCase().includes(e.target.value.toLowerCase())
  );

  productSellers = data[0].products.filter((product) => product.price < 10);

  const dataValueSellers = productSellers.filter((letter) =>
    letter.name.toLowerCase().includes(e.target.value.toLowerCase())
  );

  productLess = data[0].products.filter((product) => product.price > 11);

  const dataValueLess = productLess.filter((letter) =>
    letter.name.toLowerCase().includes(e.target.value.toLowerCase())
  );

  if (
    e.target.value.length === 0 &&
    featured.className.includes("category-active")
  ) {
    init(data[0].products);
    containerProducts.style.justifyContent = "space-between";
    containerProducts.style.gap = "0";
    containerProducts.style.padding = "0";
  } else if (
    e.target.value.length === 0 &&
    bestSellers.className.includes("category-active")
  ) {
    init(dataValueSellers);
    containerProducts.style.justifyContent = "center";
    containerProducts.style.gap = "1rem";
    containerProducts.style.padding = "0";
  } else if (
    e.target.value.length === 0 &&
    lessSold.className.includes("category-active")
  ) {
    init(dataValueLess);
    containerProducts.style.justifyContent = "center";
    containerProducts.style.gap = "1rem";
    containerProducts.style.padding = "0";
  }

  if (e.key === "Enter" && e.target.value.length !== 0) {
    if (
      featured.className.includes("category-active") &&
      dataValue.length === 0
    ) {
      containerProducts.innerHTML = `
          <p class="empty-message">No hay productos disponibles con ese nombre</p>
      `;
      containerProducts.style.justifyContent = "center";
      containerProducts.style.padding = "2.5rem";
      containerProducts.style.gap = "0";
    } else if (
      bestSellers.className.includes("category-active") &&
      dataValueSellers.length === 0
    ) {
      containerProducts.innerHTML = `
          <p class="empty-message">No hay productos disponibles con ese nombre</p>
      `;
      containerProducts.style.justifyContent = "center";
      containerProducts.style.padding = "2.5rem";
      containerProducts.style.gap = "0";
    } else if (
      lessSold.className.includes("category-active") &&
      dataValueLess.length === 0
    ) {
      containerProducts.innerHTML = `
          <p class="empty-message">No hay productos disponibles con ese nombre</p>
      `;
      containerProducts.style.justifyContent = "center";
      containerProducts.style.padding = "2.5rem";
      containerProducts.style.gap = "0";
    } else if (featured.className.includes("category-active")) {
      init(dataValue);
      containerProducts.style.justifyContent = "space-between";
      containerProducts.style.gap = "0";
      containerProducts.style.padding = "0";
    } else if (bestSellers.className.includes("category-active")) {
      init(dataValueSellers);
      containerProducts.style.justifyContent = "center";
      containerProducts.style.gap = "1rem";
      containerProducts.style.padding = "0";
    } else if (lessSold.className.includes("category-active")) {
      init(dataValueLess);
      containerProducts.style.justifyContent = "space-between";
      containerProducts.style.gap = "0";
      containerProducts.style.padding = "0";
    }
  }

  if (containerProducts.children.length < 6) {
    containerProducts.style.justifyContent = "center";
    containerProducts.style.gap = "1rem";
  }

  if (
    window.innerWidth <= 320 ||
    (window.innerWidth >= 390 && window.innerWidth <= 412)
  ) {
    containerProducts.style.justifyContent = "center";
    containerProducts.style.gap = "0";
    containerProducts.style.padding = "0";
  }
}

function categoryFilterShow() {
  const productsCategory = document.querySelectorAll(".products-category");

  productsCategory.forEach((btn) =>
    btn.addEventListener("click", categoryFilterBtn)
  );
}

let sellersFilter = [];
let lessFilter = [];

const featured = document.querySelector(".featured");
const bestSellers = document.querySelector(".best-sellers");
const lessSold = document.querySelector(".less-sold");

function categoryFilterBtn(e) {
  const valueSearchProducts = document.querySelector("[data-input-search]");
  const value = e.target;

  sellersFilter = data[0].products.filter((product) => product.price < 10);

  lessFilter = data[0].products.filter((product) => product.price > 11);

  if (value.textContent === "Destacados") {
    init(data[0].products);
    containerProducts.style.justifyContent = "space-between";
    containerProducts.style.gap = "0";
    featured.classList.add("category-active");
    bestSellers.classList.remove("category-active");
    lessSold.classList.remove("category-active");
    valueSearchProducts.value = "";
  } else if (value.textContent === "Más vendidos") {
    init(sellersFilter);
    containerProducts.style.justifyContent = "center";
    containerProducts.style.gap = "1rem";
    bestSellers.classList.add("category-active");
    featured.classList.remove("category-active");
    lessSold.classList.remove("category-active");
    valueSearchProducts.value = "";
  } else if (value.textContent === "Menos vendidos") {
    init(lessFilter);
    containerProducts.style.justifyContent = "center";
    containerProducts.style.gap = "1rem";
    lessSold.classList.add("category-active");
    featured.classList.remove("category-active");
    bestSellers.classList.remove("category-active");
    valueSearchProducts.value = "";
  }
  if (
    window.innerWidth <= 320 ||
    (window.innerWidth >= 390 && window.innerWidth <= 412)
  ) {
    containerProducts.style.justifyContent = "center";
    containerProducts.style.gap = "0";
    containerProducts.style.padding = "0";
  }
}

const cartProductContainer = document.querySelector(".cart-product");

const emptyTotal = document.querySelector(".empty-total");
emptyTotal.classList.add("none");

const emptyCart = document.createElement("p");

emptyCart.classList.add("empty-cart");

emptyCart.textContent = "El carrito está vacío";

cartProductContainer.appendChild(emptyCart);

function btnShow() {
  const btnAdd = document.querySelectorAll(".btn-add-card");

  btnAdd.forEach((btn) => btn.addEventListener("click", btnAddProduct));
}

let dataProducts = [];

const badge = document.querySelector(".badge");

const badgeText = badge.querySelector("span");

let totalOfProducts = 0;

function btnAddProduct(e) {
  cartProductContainer.innerHTML = "";

  const product = e.target.parentElement.parentElement;
  const productImage = product.querySelector(".product-image");
  const productBtn = product.querySelector(".product-btn");

  const infoProduct = {
    id: productBtn.querySelector("button").id,
    image: productImage.querySelector("img").src,
    name: product.querySelector(".product-title").textContent,
    price: product.querySelector(".product-price").textContent,
    quantity: 1,
  };

  const exist = dataProducts.some((product) => product.id === infoProduct.id);

  if (exist) {
    const products = dataProducts.map((product) => {
      if (product.id === infoProduct.id) {
        product.quantity++;
        return product;
      } else {
        return product;
      }
    });
    dataProducts = [...products];
  } else {
    dataProducts.push(infoProduct);
  }

  totalOfProducts = totalOfProducts + infoProduct.quantity;
  badgeText.innerText = totalOfProducts;

  cartProducts();
}

const linkCart = document.querySelector(".link-cart");

linkCart.addEventListener("click", (e) => {
  e.preventDefault();

  const cartContainer = document.querySelector(".cart-container");

  cartContainer.classList.toggle("none");
});

function cartProducts() {
  dataProducts.sort((a, b) => {
    if (a.quantity < b.quantity) {
      return 1;
    }
    if (a.quantity > b.quantity) {
      return -1;
    }
    return 0;
  });

  dataProducts.forEach((product) => {
    const { id, image, name, price, quantity } = product;

    cartProductContainer.innerHTML += `
    <div id="${id}" class="product">
      <div class="product-image">
        <img src="${image}" alt="${name}" />
      </div>
      <div class="product-container-title">
        <p class="product-quantity">x<span>${quantity}</span></p>
        <h4 class="product-title">${name}</h4>
      </div>
      <p class="product-price">$${parseFloat(
        price.slice(1, price.length) * quantity
      ).toFixed(2)}</p>
      <i id="${id}"  class="bi bi-trash3"></i>
      </div>
      `;

    showBtnDelete();
    total();
  });
}

function showBtnDelete() {
  const btnDelete = document.querySelectorAll(".bi-trash3");

  btnDelete.forEach((btn) => btn.addEventListener("click", btnTrash));
}

function total() {
  if (dataProducts.length === 0) {
    emptyTotal.classList.add("none");
  } else {
    emptyTotal.classList.remove("none");
  }

  let priceTotal = document.querySelector(".price-total");

  priceTotal.innerHTML = `$${dataProducts
    .reduce(
      (acc, product) =>
        acc +
        parseFloat(
          product.price.slice(1, product.price.length) * product.quantity
        ),
      0
    )
    .toFixed(2)}`;
}

function btnTrash(e) {
  dataProducts = dataProducts.filter((id) => id.id != e.target.id);
  e.target.parentElement.remove();

  if (dataProducts.length === 0) {
    cartProductContainer.appendChild(emptyCart);
  }

  totalOfProducts = dataProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  badgeText.textContent = totalOfProducts;

  total();
}

const countdown = setInterval(() => {
  const dayHtml = document.querySelector("[data-days]"),
    hoursHtml = document.querySelector("[data-hours]"),
    minutesHtml = document.querySelector("[data-minutes]"),
    secondsHtml = document.querySelector("[data-seconds]");

  let now = new Date().getTime();
  let halloweenDay = new Date("31 oct 2023").getTime();
  let limitTime = halloweenDay - now;

  let days = Math.floor(limitTime / (1000 * 60 * 60 * 24));
  let hours = (
    "0" + Math.floor((limitTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).slice(-2);
  let minutes = (
    "0" + Math.floor((limitTime % (1000 * 60 * 60)) / (1000 * 60))
  ).slice(-2);
  let seconds = ("0" + Math.floor((limitTime % (1000 * 60)) / 1000)).slice(-2);

  dayHtml.innerHTML = `${days} Días`;
  hoursHtml.innerHTML = `${hours} Hs`;
  minutesHtml.innerHTML = `${minutes} Min`;
  secondsHtml.innerHTML = `${seconds} Seg`;

  if (limitTime < 0) {
    clearInterval(countdown);
    dayHtml.innerHTML = `${0} Días`;
    hoursHtml.innerHTML = `${"00"} Hs`;
    minutesHtml.innerHTML = `${"00"} Min`;
    secondsHtml.innerHTML = `${"00"} Seg`;
  }
}, 1000);
