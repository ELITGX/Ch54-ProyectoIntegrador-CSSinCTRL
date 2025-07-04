// Shopping.js 
import { insertHeader, getNumberCartItems } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath = "../../../"
const localStorageKey = "products";

const formatPrice = (price) => {
    return `${new Intl.NumberFormat("es-MX", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price)} MXN`;
};

insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"), homePath);

const readProducts = async (url) => {
    try {
        const response = await fetch(url);
        const datosApi = await response.json();
        return datosApi;
    } catch (error) {
        console.log("No se pueden obtener los datos", error);
    }
}

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
                <input class="form-control quantity-input text-center mx-2" style="width: 60px;" type="number" min="1" value="1" data-index="${index}" />
                <button class="btn btn-outline-secondary btn-sm btn-plus" data-index="${index}">+</button>
              </div>

              <div class="d-flex justify-content-between">
                <button class="btn btn-success btn-add-cart" data-index="${index}">Añadir al carrito</button>
                <button class="btn btn-info view-more-btn" data-index="${index}">Ver más</button>
              </div>

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

const filtrado = (productos = [], texto) => {
    return productos.filter(item => item.name.trim(" ").toLowerCase().includes(texto.toLowerCase()));
}

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

const createProductCards = (texto = "") => {
    let data = JSON.parse(localStorage.getItem(localStorageKey));
    let products = data?.results || data;

    if (texto) {
        products = filtrado(data.results, texto);
        if (products.length < 1) {
            const refDom = document.getElementById("cards");
            refDom.innerHTML = "<div class='col-auto mt-3'><h3>No se encontraron resultados que coincidan con la búsqueda</h3></div>";
            return;
        }
    } else {
        products = data?.results || data;
        if (!products || !Array.isArray(products)) return;
    }

    if (!products || !Array.isArray(products)) return;

    const cards = buildProductCards(products);
    insertCardsDom(cards);

    document.querySelectorAll(".btn-minus").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let qty = parseInt(input.value);
            if (qty > 1) input.value = qty - 1;
        });
    });

    document.querySelectorAll(".btn-plus").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let qty = parseInt(input.value);
            input.value = qty + 1;
        });
    });

    document.querySelectorAll(".view-more-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const product = products[index];

            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            const selectedQty = parseInt(input.value);

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
                alert(`${product.name} añadido al carrito (${modalQty})`);
                bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
                getNumberCartItems();
            };

            const modal = new bootstrap.Modal(document.getElementById("productModal"));
            modal.show();
        });
    });

    document.querySelectorAll(".btn-add-cart").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const product = products[index];

            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            const selectedQty = parseInt(input.value);

            for (let i = 0; i < selectedQty; i++) {
                addToCart(product);
            }

            alert(`${product.name} añadido al carrito (${selectedQty})`);
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

// Inicializar
jsonToLocal("../../../modules/assets/objetos.json").then(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");
    if (query) {
        createProductCards(query);
    } else {
        createProductCards();
    }
});