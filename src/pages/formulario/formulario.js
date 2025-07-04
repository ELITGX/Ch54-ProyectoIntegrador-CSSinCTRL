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

    imageDataUrl = document.getElementById("image").value;
    console.log(imageDataUrl);

    imagePreview.src = imageDataUrl;
    imagePreview.style.display = "block";
    


/*     const file = e.target.files[0];
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
    } */
    
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
  // ==================== Leer productos de Api
  const readProducts = async (url) => {
    try {
        const response = await fetch(url);
        const datosApi = await response.json();
        return datosApi;
    } catch (error) {
        console.log("No se pueden obtener los datos", error);
    }
  };
  
  // ==================== Envío de formulario =============================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      //id: document.getElementById("ID").value,
      name: document.getElementById("nombre").value,
      description: document.getElementById("descripcion").value,
      price: parseFloat(document.getElementById("price").value),
      presentation: document.getElementById("presentacion").value,
      concentration: document.getElementById("concentracion").value,
      administrationRoute: routeSub.value, // obtenemos la subcategoría elegida
      stock: parseInt(document.getElementById("cantidad").value),
      imgUrl: imageDataUrl || "https://via.placeholder.com/150",
      discountPercentage: parseFloat(document.getElementById("discount").value),
      categoryId:1,
      productPropertyId:1
      
    };

    const {/*id:prod_id,*/ name, description, price, presentation, concentration, administrationRoute, stock, img, discountPercentage} = newProduct;

     //==================== Expresiones regulares =======================================
  const validationId = /^[a-zA-Z0-9]{3,}$/;
  const validationPresentation = /^[a-zA-Z0-9\s]{2,}(ml|mg|g|kg|L)?$/;
  const validationName = /^[a-zA-Z0-9]/;
  const validationConcentration = /^\d+(\.\d+)?\s*(mg|mcg|g|ml|l|%|UI|IU|mmol|meq|µg)?(\/?(ml|l|g|dosis|tableta|comprimido|ampolla))?$/i;
  
  //==================== Validaciones ==========================================
  const isValidId = validationId.test(prod_id);
  const isValidImage = imageDataUrl || img !== "https://via.placeholder.com/150";
  const isValidPresentation = validationPresentation.test(presentation);
  const isValidConcentration = validationConcentration.test(concentration);
  const isValidDescription = description.length >= 10 && description.length <= 500;
  const isValidName = validationName.test(name);
  const isValidPrice = !isNaN(price) && price > 0;
  const isValidRouteMain = document.getElementById("route-main").value !== "";
  const isValidRouteSub = administrationRoute !== "";
  const isValidStock = !isNaN(stock) && stock > 0;
  const isValidDiscount = !isNaN(discountPercentage) && discountPercentage >= 0 && discountPercentage <= 100;


  const alertInput = (message, color, borderColor, backgroundColor) => {
    alertContainer.innerHTML = `
    <div class="text-center">
      <div class="alert alert-dismissible fade show py-2" role="alert"
           style="text-align: center; display: inline-block;  background-color:${backgroundColor};
           color:${color}; border-color: ${borderColor};">
        <strong>${message}</strong>
        </div>
      </div>`;

    setTimeout(() => {
      const alert = alertContainer.querySelector('.alert');
      if (alert) {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      }
    }, 3000);
  };

   
   /*if (!isValidId) {
    alertInput("El producto debe tener un ID. Puede ser alfanumérico.", "#FF6F61", "#FFFFFF", "#FFFFFF");
  } else*/ if (!isValidName) {
    alertInput("Agrega el nombre del producto. Sólo puede contener letras y números.", "#FF6F61", "#FFFFFF", "#FFFFFF");
  } else if (!isValidDescription) {
    alertInput("Agrega una descripción con máximo 500 caracteres.", "#FF6F61", "#FFFFFF", "#FFFFFF");
  }else if (!isValidPrice) {
    alertInput("El precio es un campo requerido.", "#FF6F61", "#FFFFFF", "#FFFFFF");
  } else if (!isValidPresentation) {
    alertInput("La presentación es un campo requerido. Ejemplo: 10 ml)", "#FF6F61", "#FFFFFF", "#FFFFFF");
  } else if (!isValidConcentration) {
    alertInput("La concentración es un campo requerido. Ejemplo: 50mg, 10ml, 5mg/ml, 100UI", "#FF6F61", "#FFFFFF", "#FFFFFF");
  } else if (!isValidRouteMain) {
    alertInput("Debes seleccionar una vía principal de administración", "#FF6F61", "#FFFFFF", "#FFFFFF");
  } else if (!isValidRouteSub) {
    alertInput("Debes seleccionar una subcategoría de administración", "#FF6F61", "#FFFFFF", "#FFFFFF");
  } else if (!isValidStock) {
    alertInput("Debes de tener al menos 1 producto en tu stock", "#FF6F61", "#FFFFFF", "#FFFFFF");
  } else if (!isValidImage) {
    alertInput("Debes seleccionar una imagen válida", "#FF6F61", "#FFFFFF", "#FFFFFF"); // Posible eliminación
  } else if (!isValidDiscount) {
    alertInput("El descuento debe estar entre 0% y 100%", "#FF6F61", "#FFFFFF", "#FFFFFF"); 
  } else {
    alertInput("¡Producto agregado correctamente!", "#0a3622", "#0a3622", "#d1e7dd");



      
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
  document.getElementById("discount").value = product.discountPercentage || 0;

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

const handleDeleteProduct = async (index) => {

  const productList = document.getElementById("productList");
  let data = await readProducts("http://localhost:8080/api/v1/products");
  let stored = data;
  let usingApi = true;
  let product = stored[index];

  if(!data || data.length < 1){
    stored = JSON.parse(localStorage.getItem("products"));
    usingApi = false;
    product =stored.results[index];
  }
  
  
  const confirmed = confirm(`¿Eliminar "${product.name}" del inventario?`);

  if (confirmed) {
    if(usingApi){
      const options = {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json" // Tipo de contenido
        }
      }
      const response = await fetch( `http://localhost:8080/api/v1/products/${product.id}`, options);
      console.log( "Respuesta del servidor:", response );
      if ( !response.ok  ) {
          // Si la respuesta no es correcta, lanzar un error
          throw new Error(`Error al intentar eliminar el producto: ${response.statusText}`);
      }

    }else{
      stored.results.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(stored));
    }
    renderProductList();
    
  }
};
  // ==================== Renderiza la lista de productos =============================
const renderProductList = async ()=> {
  const productList = document.getElementById("productList");
  let data = await readProducts("http://localhost:8080/api/v1/products");
  let stored = data;
  if(!data || data.length < 1){
    stored = JSON.parse(localStorage.getItem("products")) || { results: [] };
    stored = stored.results;
  }
  console.log(stored)

  productList.innerHTML = "";

  stored.forEach((product, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start", "flex-column", "flex-md-row");

    li.innerHTML = `
      <div class="ms-2 me-auto">
        <div class="fw-bold">${product.name}</div>
        Precio original: $${product.price.toFixed(2)} MXN <br>
      ${product.discountPercentage > 0 ? `
          <span class="text-danger">
            Descuento: ${product.discountPercentage}% <br>
          </span> 
          <span class="text-success">
           Precio final: $${product.price * (1 - product.discountPercentage / 100)} MXN <br>
          </span>`: ""}
        Stock: ${product.stock}
      </div>
      <div class="btn-group mt-2 mt-md-0">
        <button class="btn btn-outline-success btn-sm" data-index="${index}" data-action="stock" title="Añadir stock">
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


