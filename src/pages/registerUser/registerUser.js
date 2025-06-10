import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";

const homePath = "../../../";
insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"));


// Asumiendo que las validaciones ya se hicieron y el formulario es válido

const formulario = document.getElementById("registerUser");

formulario.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir que se recargue la página

 // Crear el objeto directamente mientras se obtienen los valores de los inputs
  const usuario = {
    nombreCompleto: document.getElementById("nameUser").value,
    telefono: document.getElementById("phoneUser").value,
    email: document.getElementById("emailUser").value,
    password: document.getElementById("passwordUser").value
  };

  // Si se quiere en formato JSON para enviar a un servidor:
  const usuarioJSON = JSON.stringify(usuario);
  
 // Guardar en localStorage
  localStorage.setItem("usuario", usuarioJSON);

 // Confirmar que se guardó correctamente
  // alert("¡Datos guardados en localStorage!");

 // Mostrar la alerta de Bootstrap
  document.getElementById("alertaExito").classList.remove("d-none");

// Opcional: limpiar el formulario
  formulario.reset();
});