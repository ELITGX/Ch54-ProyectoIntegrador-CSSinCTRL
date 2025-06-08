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

  // Escuchar cambios en el input file para mostrar previsualización
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

  // Al enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoProducto = {
      id: document.getElementById("ID").value,
      nombre: document.getElementById("nombre").value,
      descripcion: document.getElementById("descripcion").value,
      precio: parseFloat(document.getElementById("precio").value),
      presentacion: document.getElementById("presentacion").value,
      concentracion: document.getElementById("concentracion").value,
      viaAdministracion: document.getElementById("via-administración").value,
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

    alert("¡Producto añadido con éxito!");
  });
});
