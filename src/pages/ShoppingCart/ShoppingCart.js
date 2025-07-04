// Shopping.js
import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";

const homePath = "../../../";
insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"), homePath);

const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotalElement = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Renderizar carrito
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p class='text-muted'>Tu carrito está vacío.</p>";
    cartTotalElement.textContent = "$0.00";
    return;
  }

  let total = 0;

   cart.forEach((item, index) => {
  const itemElement = document.createElement("div");
  itemElement.classList.add("card", "mb-2", "p-2", "d-flex", "flex-row", "align-items-center", "justify-content-between");

  //Se añaden los boternes de + y -
  itemElement.innerHTML = `
  <div>
    <h5 class="mb-0">${item.name}</h5>
    <small class="text-muted">Precio unitario: ${item.price.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</small><br>
    <small class="text-muted">Cantidad: ${item.quantity}</small>
  </div>
  <div class="d-flex align-items-center">
    <button class="btn btn-minus btn-sm btn-outline-secondary me-1" data-action="decrease" data-id="${item.id}">−</button>
    <button class="btn btn-plus btn-sm btn-outline-secondary me-2" data-action="increase" data-id="${item.id}">+</button>
    <span class="fw-bold">${(item.price * item.quantity).toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</span>
    <button class="btn trash btn-sm btn-outline-danger ms-2" data-action="remove" data-index="${index}">
      <i class="bi bi-trash"></i>
    </button>
  </div>
`;


  cartItemsContainer.appendChild(itemElement);
  total += item.price * item.quantity;

  const buttons = itemElement.querySelectorAll("button");

  // Escucha los clics de los botones +, − y eliminar:
buttons.forEach((btn) => {
  const action = btn.dataset.action;
  const productId = btn.dataset.id;
  const index = btn.dataset.index;

  btn.addEventListener("click", () => {
    if (action === "increase") {
      changeQuantity(productId, 1);
    } else if (action === "decrease") {
      changeQuantity(productId, -1);
    } else if (action === "remove") {
      removeItemFromCart(index);
    }
  });
});

 function changeQuantity(id, delta) {
  id = Number(id); // Asegura que la comparación funcione correctamente
  const item = cart.find((p) => p.id === id);
  if (!item) return;

  // Verifica que la nueva cantidad no sea menor que 1
  const newQuantity = item.quantity + delta;
  if (newQuantity <= 0) {
    // Si quieres permitir eliminar el producto al llegar a 0:
    cart = cart.filter((p) => p.id !== id);
  } else {
    item.quantity = newQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
} 

});

   cartTotalElement.textContent = total.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN"
  });

  const removeButtons = cartItemsContainer.querySelectorAll(".trash");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      removeItemFromCart(index);
    });
  });
}

function removeItemFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

clearCartBtn.addEventListener("click", () => {
  if (confirm("¿Vaciar el carrito?")) {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  }
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("¡Tu carrito está vacío!");
    return;
  }
  alert("¡Gracias por tu compra!");
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
});


renderCart();