import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";

const homePath = "../../../";
insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"), homePath);


let stockIndex = null; // Guardamos el índice actual a editar


let imageDataUrl = "";

// Subopciones accesibles globalmente
const subOptions = {
  enterales: ["Oral", "Sublingual", "Buccal", "Rectal"],
  parenterales: [
    "Intravenosa (IV)",
    "Intramuscular (IM)",
    "Subcutánea (SC)",
    "Intradérmica",
    "Intraósea",
    "Intratecal / Intraespinal",
    "Intraarticular",
    "Intracardiaca",
    "Intraperitoneal"
  ],
  topicas: [
    "Cutánea o tópica",
    "Oftálmica",
    "Ótica",
    "Nasal",
    "Vaginal",
    "Rectal"
  ],
  respiratoria: ["Inhalatoria"],
  transdermica: ["Parches"]
};


// ================================================================================

document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("productForm");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const alertContainer = document.getElementById("alertContainer");
const routemain = document.getElementById("route-main");
const routeSub = document.getElementById("route-sub");
const stockInput = document.getElementById("stockInput");
const stockProductName = document.getElementById("stockProductName");
const confirmAddStock = document.getElementById("confirmAddStock");
const stockModal = new bootstrap.Modal(document.getElementById("stockModal"));

  routemain.addEventListener("change", () => {
    const selection = routemain.value;

    // Limpia las subopciones
    routeSub.innerHTML = "<option value=''>Selecciona una subcategoría</option>";

    if (subOptions[selection]) {
      subOptions[selection].forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        routeSub.appendChild(opt);
      });
    }
  });

  // ==================== Previsualización de imagen ======================
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imageDataUrl = reader.result; // Guardamos el base64
        imagePreview.src = imageDataUrl;
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = "";
      imagePreview.style.display = "none";
      imageDataUrl = "";
    }
  });

// ==================== Descuento a producto ========================
  const discountBtn = document.getElementById("discount-Btn");
  const discountResult = document.getElementById("discount-Result");
  

  discountBtn.addEventListener("click", ()=>{
    const priceOriginal = parseFloat(document.getElementById("price").value);
  const discount = parseFloat(document.getElementById("discount").value);
      
      // Validar los valores
      if (discount < 0 || discount > 100) {
          discountResult.innerHTML = "El descuento debe estar entre 0% y 100%.";
          return;
      }
      
      // Calcular el precio con descuento
      const discountApplied = priceOriginal * (discount / 100);
      const priceFinal = priceOriginal - discountApplied;
      
      // Mostrar el resultado
      discountResult.innerHTML = `
          <p>Precio original: $${priceOriginal.toFixed(2)}</p>
          <p>Descuento aplicado: ${discount}% ($${discountApplied.toFixed(2)})</p>
          <p><strong>Precio final: $${priceFinal.toFixed(2)}</strong></p>
      `;
  });


  
  // ==================== Envío de formulario =============================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      id: document.getElementById("ID").value,
      name: document.getElementById("nombre").value,
      description: document.getElementById("descripcion").value,
      price: parseFloat(document.getElementById("price").value),
      presentation: document.getElementById("presentacion").value,
      concentration: document.getElementById("concentracion").value,
      administrationRoute: routeSub.value, // obtenemos la subcategoría elegida
      stock: parseInt(document.getElementById("cantidad").value),
      img: imageDataUrl || "https://via.placeholder.com/150",
      porcentajeDescuento: parseFloat(document.getElementById("discount").value)
      
    };

    const {id:prod_id, name, description, price, presentation, concentration, administrationRoute, stock, img, porcentajeDescuento} = newProduct;

      // Validaciones básicas
      if (name && img && description && price !== 0 && presentation && concentration && administrationRoute && stock ) {
              console.log("Producto creado:", newProduct);
        alertContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>¡Datos enviados!</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>`

      // Guardar en localStorage
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
      savedProducts.results.push(newProduct);
      localStorage.setItem("products", JSON.stringify(savedProducts));

      // Limpiar formulario y previsualización
      form.reset();
      imagePreview.src = "";
      imagePreview.style.display = "none";
      imageDataUrl = "";
      

      // Limpiar subopciones de vía
      routeSub.innerHTML = "<option value=''>Selecciona una subcategoría</option>";

      // Limpiar descuento
      discountResult.innerHTML = "";

    } 


  });
  // ==================== Botones de formulario de stock =============================
  const handleStockIncrease = (index) => {
  const stored = JSON.parse(localStorage.getItem("products"));
  const product = stored.results[index];

  stockIndex = index;
  stockProductName.textContent = `Producto: ${product.name}`;
  stockInput.value = "";
  stockModal.show();
};

confirmAddStock.addEventListener("click", () => {
  const cantidad = parseInt(stockInput.value);
  if (!isNaN(cantidad) && cantidad > 0) {
    const stored = JSON.parse(localStorage.getItem("products"));
    stored.results[stockIndex].stock += cantidad;
    localStorage.setItem("products", JSON.stringify(stored));
    stockModal.hide();
    renderProductList();
  } else {
    alert("Ingresa una cantidad válida.");
  }
});



const handleEditProduct = (index) => {
  const storedProducts = JSON.parse(localStorage.getItem("products"));
  const product = storedProducts.results[index];

  document.getElementById("ID").value = product.id;
  document.getElementById("nombre").value = product.name;
  document.getElementById("descripcion").value = product.description;
  document.getElementById("price").value = product.price;
  document.getElementById("presentacion").value = product.presentation;
  document.getElementById("concentracion").value = product.concentration;
  document.getElementById("cantidad").value = product.stock;
  document.getElementById("discount").value = product.porcentajeDescuento || 0;

  // Si ya hay una imagen cargada
  if (product.img) {
    imagePreview.src = product.img;
    imagePreview.style.display = "block";
  }

  // Seleccionar vía principal y subcategoría si existe
  for (const key in subOptions) {
    if (subOptions[key].includes(product.administrationRoute)) {
      routemain.value = key;
      const event = new Event("change");
      routemain.dispatchEvent(event); // Disparar para llenar subcategorías
      routeSub.value = product.administrationRoute;
      break;
    }
  }
};

const handleDeleteProduct = (index) => {
  const stored = JSON.parse(localStorage.getItem("products"));
  const product = stored.results[index];
  const confirmed = confirm(`¿Eliminar "${product.name}" del inventario?`);

  if (confirmed) {
    stored.results.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(stored));
    renderProductList();
  }
};
  // ==================== Renderiza la lista de productos =============================
const renderProductList = () => {
  const productList = document.getElementById("productList");
  const stored = JSON.parse(localStorage.getItem("products")) || { results: [] };

  productList.innerHTML = "";

  stored.results.forEach((product, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start", "flex-column", "flex-md-row");

    li.innerHTML = `
      <div class="ms-2 me-auto">
        <div class="fw-bold">${product.name}</div>
        Precio: $${product.price.toFixed(2)}<br>
        Stock: ${product.stock}
      </div>
      <div class="btn-group mt-2 mt-md-0">
        <button class="btn btn-outline-success btn-sm me-2" data-index="${index}" data-action="stock" title="Añadir stock">
          <i class="bi bi-plus-circle"></i>
        </button>
        <button class="btn btn-outline-primary btn-sm" data-index="${index}" data-action="edit" title="Editar">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm" data-index="${index}" data-action="delete" title="Eliminar">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    productList.appendChild(li);
  });

  // Delegación de eventos
  productList.querySelectorAll("button").forEach((btn) => {
  const index = btn.getAttribute("data-index");
  const action = btn.getAttribute("data-action");

  btn.addEventListener("click", () => {
    if (action === "stock") {
      handleStockIncrease(index);
    } else if (action === "edit") {
      handleEditProduct(index);
    } else if (action === "delete") {
      handleDeleteProduct(index);
    }
  });
});






};
renderProductList();
});


