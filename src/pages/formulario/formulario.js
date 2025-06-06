import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath ="../../../"

insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer")); 


// ================================================================================
const form = document.getElementById('productForm');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita recargar la página

  const nuevoProducto = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    cantidad: parseInt(document.getElementById('cantidad').value),
    precio: parseFloat(document.getElementById('precio').value),
    imagen: document.getElementById('imagen').value || 'https://via.placeholder.com/150'
  };

  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push(nuevoProducto);
  localStorage.setItem('productos', JSON.stringify(productos));

  alert('✅ Producto guardado');
  form.reset(); // Limpia el formulario
});