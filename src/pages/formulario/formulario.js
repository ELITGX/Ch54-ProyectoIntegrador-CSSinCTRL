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
    const seleccion = routemain.value;

    // Limpia las subopciones
    routeSub.innerHTML = "<option value=''>Selecciona una subcategoría</option>";

    if (subOptions[seleccion]) {
      subOptions[seleccion].forEach((opcion) => {
        const opt = document.createElement("option");
        opt.value = opcion;
        opt.textContent = opcion;
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
  const botonDescuento = document.getElementById("botonDescuento");
  const resultadoDescuento = document.getElementById("resultadoDescuento");
  

  botonDescuento.addEventListener("click", ()=>{
    const precioOriginal = parseFloat(document.getElementById("precio").value);
  const descuento = parseFloat(document.getElementById("descuento").value);
      
      // Validar los valores
      if (descuento < 0 || descuento > 100) {
          resultadoDescuento.innerHTML = "El descuento debe estar entre 0% y 100%.";
          return;
      }
      
      // Calcular el precio con descuento
      const descuentoAplicado = precioOriginal * (descuento / 100);
      const precioFinal = precioOriginal - descuentoAplicado;
      
      // Mostrar el resultado
      resultadoDescuento.innerHTML = `
          <p>Precio original: $${precioOriginal.toFixed(2)}</p>
          <p>Descuento aplicado: ${descuento}% ($${descuentoAplicado.toFixed(2)})</p>
          <p><strong>Precio final: $${precioFinal.toFixed(2)}</strong></p>
      `;
  });


  // ==================== Envío de formulario =============================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      id: document.getElementById("ID").value,
      nombre: document.getElementById("nombre").value,
      descripcion: document.getElementById("descripcion").value,
      precio: parseFloat(document.getElementById("precio").value),
      presentacion: document.getElementById("presentacion").value,
      concentracion: document.getElementById("concentracion").value,
      viaAdministracion: routeSub.value, // obtenemos la subcategoría elegida
      stock: parseInt(document.getElementById("cantidad").value),
      imagen: imageDataUrl || "https://via.placeholder.com/150",
      porcentajeDescuento: parseFloat(document.getElementById("descuento").value)
      
    };

    console.log("Producto creado:", newProduct);

    // Guardar en localStorage
    const savedProducts = JSON.parse(localStorage.getItem("productos")) || [];
    savedProducts.push(newProduct);
    localStorage.setItem("productos", JSON.stringify(savedProducts));

    // Limpiar formulario y previsualización
    form.reset();
    imagePreview.src = "";
    imagePreview.style.display = "none";
    imageDataUrl = "";
    

    // Limpiar subopciones de vía
    routeSub.innerHTML = "<option value=''>Selecciona una subcategoría</option>";

    // Limpiar descuento
    resultadoDescuento.innerHTML = "";

    alert("¡Producto añadido con éxito!");
  });
});


  

