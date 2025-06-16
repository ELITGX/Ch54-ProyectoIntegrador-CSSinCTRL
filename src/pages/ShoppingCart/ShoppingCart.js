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
    itemElement.classList.add(
      "card",
      "mb-2",
      "p-2",
      "d-flex",
      "flex-row",
      "align-items-center",
      "justify-content-between"
    );

    itemElement.innerHTML = `
      <div>
        <h5 class="mb-0">${item.name}</h5>
        <small class="text-muted">$${item.price.toFixed(2)}</small>
      </div>
      <div>
        <span class="fw-bold">$${item.price.toFixed(2)}</span>
        <button class="btn btn-sm btn-outline-danger ms-2" data-index="${index}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(itemElement);
    total += item.price;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;

  const removeButtons = cartItemsContainer.querySelectorAll("button");
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
