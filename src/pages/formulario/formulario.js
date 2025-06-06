import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath ="../../../"

insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer")); 


// ================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");

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
      imagen: document.getElementById("imagen").value || "https://via.placeholder.com/150"
    };

    console.log("Producto creado:", nuevoProducto);

    // Aquí puedes guardar el producto en localStorage o enviarlo al backend.
    // Por ejemplo, para guardarlo en localStorage:
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    productosGuardados.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productosGuardados));

    // Limpiar formulario
    form.reset();
    alert("¡Producto añadido con éxito!");
  });
});