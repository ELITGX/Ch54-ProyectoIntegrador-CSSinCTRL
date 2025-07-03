// Shopping.js
import { insertHeader, getNumberCartItems } from "../../../modules/header/header.js";
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

  itemElement.innerHTML = `
    <div>
      <h5 class="mb-0">${item.name}</h5>
      <small class="text-muted">Cantidad: ${item.quantity}</small>
    </div>
    <div>
        <span class="fw-bold">${(item.price * item.quantity).toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</span>
        <button class="btn btn-sm btn-outline-danger ms-2" data-index="${index}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
  `;


  cartItemsContainer.appendChild(itemElement);
  total += item.price * item.quantity;

});

   cartTotalElement.textContent = total.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN"
/* =======
    cartItemsContainer.appendChild(itemElement);
    total += item.price;
    
>>>>>>> 30d2fec176915f3cfac2a4bb468489f121d11eed */
  });

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
  getNumberCartItems();
  
}

clearCartBtn.addEventListener("click", () => {
  if (confirm("¿Vaciar el carrito?")) {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
    getNumberCartItems();
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
  getNumberCartItems();
});

renderCart();
