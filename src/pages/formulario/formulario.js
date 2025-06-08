import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";

const homePath = "../../../";
insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"));

// ================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const imagenInput = document.getElementById("imagen");
  const imagenPreview = document.getElementById("imagenPreview");

  let imagenDataUrl = ""; // Aquí guardaremos la imagen en base64

  // ==================== Vía de administración ===========================
  const viaPrincipal = document.getElementById("via-administracion-principal");
  const viaSub = document.getElementById("via-administracion-sub");

  // Opciones de subcategorías
  const subopciones = {
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

  viaPrincipal.addEventListener("change", () => {
    const seleccion = viaPrincipal.value;

    // Limpia las subopciones
    viaSub.innerHTML = "<option value=''>Selecciona una subcategoría</option>";

    if (subopciones[seleccion]) {
      subopciones[seleccion].forEach((opcion) => {
        const opt = document.createElement("option");
        opt.value = opcion;
        opt.textContent = opcion;
        viaSub.appendChild(opt);
      });
    }
  });

  // ==================== Previsualización de imagen ======================
  imagenInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imagenDataUrl = reader.result; // Guardamos el base64
        imagenPreview.src = imagenDataUrl;
        imagenPreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      imagenPreview.src = "";
      imagenPreview.style.display = "none";
      imagenDataUrl = "";
    }
  });

  // ==================== Envío de formulario =============================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoProducto = {
      id: document.getElementById("ID").value,
      nombre: document.getElementById("nombre").value,
      descripcion: document.getElementById("descripcion").value,
      precio: parseFloat(document.getElementById("precio").value),
      presentacion: document.getElementById("presentacion").value,
      concentracion: document.getElementById("concentracion").value,
      viaAdministracion: viaSub.value, // obtenemos la subcategoría elegida
      cantidad: parseInt(document.getElementById("cantidad").value),
      imagen: imagenDataUrl || "https://via.placeholder.com/150",
    };

    console.log("Producto creado:", nuevoProducto);

    // Guardar en localStorage
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    productosGuardados.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productosGuardados));

    // Limpiar formulario y previsualización
    form.reset();
    imagenPreview.src = "";
    imagenPreview.style.display = "none";
    imagenDataUrl = "";

    // Limpiar subopciones de vía
    viaSub.innerHTML = "<option value=''>Selecciona una subcategoría</option>";

    alert("¡Producto añadido con éxito!");
  });
});

