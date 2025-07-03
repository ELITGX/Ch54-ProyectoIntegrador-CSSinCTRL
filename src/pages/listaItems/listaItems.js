// Shopping.js 
import { insertHeader, getNumberCartItems } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath = "../../../"
const localStorageKey = "products";

// -------------------------------CAMBIO 6------------------------------------
const formatPrice = (price) => {
  return `${new Intl.NumberFormat("es-MX", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)} MXN`;
};
// -------------------------------FIN CAMBIO 6------------------------------------

insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"), homePath);

//==================== uso de la api fetch ==========================
const readProducts = async (url) => {
  try {
    const response = await fetch(url);
    console.log(response);
    const datosApi = await response.json();
    console.log(datosApi);
    return datosApi;
  } catch (error) {
    console.log("No se pueden obtener los datos", error);
  }
}

// Esta funcion es para renderizar el producto
const buildProductCards = (products) => {
  const cards = products.map((product, index) => (
    `<div class="col-auto mt-3">
      <div class="card" style="width: 18rem;">
        <img src="${product.img}" class="card-img-top cardImage mx-auto d-block" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5> 
          <p class="card-text">${formatPrice(product.price)}</p>

          <div class="d-flex justify-content-center align-items-center mb-2">
            <button class="btn btn-outline-secondary btn-sm btn-minus" data-index="${index}">-</button>
            <span class="mx-2 quantity" data-index="${index}">1</span>
            <button class="btn btn-outline-secondary btn-sm btn-plus" data-index="${index}">+</button>
          </div>

          <button class="btn btn-info view-more-btn" data-index="${index}">Ver más</button>
        </div>
      </div>
    </div>`
  ));
  return cards;
};

const insertCardsDom = (tarjetas, idDOM = "cards") => {
  const refDom = document.getElementById(idDOM);
  refDom.innerHTML = tarjetas.join("");
}

// Función para agregar productos al carrito
 /* const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
} */ 


// funcion nueva para agragar los productos al carrito
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};


// ✅ CAMBIO MÍNIMO AQUÍ
const createProductCars = () => {
  let data = JSON.parse(localStorage.getItem(localStorageKey));
  console.log(data);
  const products = data?.results || data;
  if (!products || !Array.isArray(products)) return;

  const cards = buildProductCards(products);
  insertCardsDom(cards);

  document.querySelectorAll(".btn-minus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const span = document.querySelector(`.quantity[data-index="${index}"]`);
      let qty = parseInt(span.textContent);
      if (qty > 1) span.textContent = qty - 1;
    });
  });

  document.querySelectorAll(".btn-plus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const span = document.querySelector(`.quantity[data-index="${index}"]`);
      let qty = parseInt(span.textContent);
      span.textContent = qty + 1;
    });
  });

  document.querySelectorAll(".view-more-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const product = products[index];

      const qtySpan = document.querySelector(`.quantity[data-index="${index}"]`);
      const selectedQty = parseInt(qtySpan.textContent);

      let modalQty = selectedQty;
      document.getElementById("modalQty").textContent = modalQty;

      const updateModalQty = () => {
        document.getElementById("modalQty").textContent = modalQty;
      };

      document.getElementById("modalMinusBtn").onclick = () => {
        if (modalQty > 1) {
          modalQty--;
          updateModalQty();
        }
      };

      document.getElementById("modalPlusBtn").onclick = () => {
        modalQty++;
        updateModalQty();
      };

      document.getElementById("modalProductImg").src = product.img;
      document.getElementById("modalProductName").textContent = product.name;
      document.getElementById("modalProductDesc").textContent = product.description;
      document.getElementById("modalProductPrice").textContent = formatPrice(product.price);
      document.getElementById("modalProductPres").textContent = product.presentation;
      document.getElementById("modalProductConc").textContent = product.concentration;
      document.getElementById("modalProductVia").textContent = product.administrationRoute;

      document.getElementById("modalAddToCart").onclick = () => {
        for (let i = 0; i < modalQty; i++) {
          addToCart(product);
        }
        alert(`${product.name} añadido al carrito (${selectedQty})`);
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
        getNumberCartItems();
      };

      const modal = new bootstrap.Modal(document.getElementById("productModal"));
      modal.show();
    });
  });

  document.querySelectorAll(".btn.btn-primary").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const product = products[index];
      addToCart(product);
      alert(`${product.name} se agregó al carrito`);
      getNumberCartItems();
    });
  });
};

const jsonToLocal = async (url) => {
  let saved = localStorage.getItem(localStorageKey);
  if (!saved || !saved.includes("results")) {
    let data = await readProducts(url);
    if (!data.results && Array.isArray(data)) {
      data = { results: data };
    }
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }
};

const addProduct = (newProduct) => {
  const data = JSON.parse(localStorage.getItem(localStorageKey));
  if (data?.results) {
    data.results.push(newProduct);
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    createProductCars();
  }
};

const updateProductById = (id, updatedFields) => {
  const data = JSON.parse(localStorage.getItem(localStorageKey));
  if (data?.results) {
    data.results = data.results.map(product =>
      product.id === id ? { ...product, ...updatedFields } : product
    );
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    createProductCars();
  }
};

const deleteProduct = ({ id, name }) => {
  const data = JSON.parse(localStorage.getItem(localStorageKey));
  if (data?.results) {
    data.results = data.results.filter(product =>
      (id ? product.id !== id : true) &&
      (name ? product.name.toLowerCase() !== name.toLowerCase() : true)
    );
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    createProductCars();
  }
};

const clearAllProducts = () => {
  const data = JSON.parse(localStorage.getItem(localStorageKey));
  if (data) {
    data.results = [];
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    createProductCars();
  }
};

// Inicializar
jsonToLocal("../../../modules/assets/objetos.json").then(() => {
  createProductCars();
});