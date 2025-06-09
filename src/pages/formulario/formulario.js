import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";

const homePath = "../../../";
insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"));

// ================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const imageInput = document.getElementById("image");
  const imagePreview = document.getElementById("imagePreview");

  let imageDataUrl = ""; // Aquí guardaremos la image en base64

  // ==================== Vía de administración ===========================
  const routemain = document.getElementById("route-main");
  const routeSub = document.getElementById("route-sub");

  // Opciones de subcategorías
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
      nombre: document.getElementById("nombre").value,
      descripcion: document.getElementById("descripcion").value,
      precio: parseFloat(document.getElementById("price").value),
      presentacion: document.getElementById("presentacion").value,
      concentracion: document.getElementById("concentracion").value,
      viaAdministracion: routeSub.value, // obtenemos la subcategoría elegida
      stock: parseInt(document.getElementById("cantidad").value),
      imagen: imageDataUrl || "https://via.placeholder.com/150",
      porcentajeDescuento: parseFloat(document.getElementById("discount").value)
      
    };

    const {id:prod_id, nombre, descripcion, precio, presentacion, concentracion, viaAdministracion, stock, imagen, porcentajeDescuento} = newProduct;

      // Validaciones básicas
      if (nombre && imagen && descripcion && precio !== 0 && presentacion && concentracion && viaAdministracion && stock ) {
              console.log("Producto creado:", newProduct);
        alertContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>¡Datos enviados!</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>`

      // Guardar en localStorage
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
      savedProducts.push(newProduct);
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
      
      alert("¡Producto añadido con éxito!");

    } 


  });
});


  

