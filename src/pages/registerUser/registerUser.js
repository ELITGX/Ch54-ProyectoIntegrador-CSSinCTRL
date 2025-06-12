import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";

const homePath = "../../../";
insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"));


// Asumiendo que las validaciones ya se hicieron y el formulario es válido

const form = document.getElementById("registerUser");

form.addEventListener("submit", event => {
  event.preventDefault(); // Prevenir que se recargue la página

 // Crear el objeto directamente mientras se obtienen los valores de los inputs
  const userData = {
    nameUser: document.getElementById("nameUser").value,
    phone: document.getElementById("phoneUser").value,
    email: document.getElementById("emailUser").value,
    password: document.getElementById("passwordUser").value,
    passwordConfirm: document.getElementById("passwordConfirm").value,
    termsAndConditions: document.getElementById("checkConditions").checked,
    privacityAgreement: document.getElementById("checkPrivacity").checked
  };

 
  const { nameUser, phone, email, password, passwordConfirm, termsAndConditions, privacityAgreement} = userData;
  
  //  ================ Validaciones de entradas de usuario ======================================

  let validationName = RegExp("^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$");
  let validationEmail = RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  let validationPhone = RegExp("^\\d{10}$");
  let validationPassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$");

  const alertInput = (message, color, borderColor, backgroundColor) => {
    alertContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert" style="text-align: center; background-color:${backgroundColor};
        color:${color}; border-color: ${borderColor};">
        <strong>${message}</strong>
        </div>`

        setTimeout(() => {
          alertContainer.innerHTML = ``
        }, 5000);
  }
  
  if (!validationName.test(nameUser)) {
    
    alertInput("¡Verifica que el nombre no contenga números, caracteres especiales o espacios al inicio y al final!", "#FF6F61", "#FF6F61", "#D6E6F2");

  } else if (!validationPhone.test(phone)) {

    alertInput("¡Verifica que el número telefónico contenga 10 dígitos", "#FF6F61", "#FF6F61", "#D6E6F2");

  } else if (!validationEmail.test(email)) {

    alertInput('¡Verifica que tu dirección de correo contenga "@" y/o un dominio válido!', "#FF6F61", "#FF6F61", "#D6E6F2");

  } else if (!validationPassword.test(password)) {

    alertInput("¡Verifica que tu contraseña contenga 8 caracteres como mínimo y al menos una letra mayúscula, un carácter especial y un número!", "#FF6F61", "#FF6F61", "#D6E6F2");

  } else if (passwordConfirm != password ) {

    alertInput("¡Verifica que ambas contraseñas coincidan!", "#FF6F61", "#FF6F61", "#D6E6F2");

  } else if (termsAndConditions != true) {

    alertInput("¡Debes aceptar términos y condiciones para continuar!", "#FF6F61", "#FF6F61", "#D6E6F2");

  } else if (privacityAgreement != true ) {

    alertInput("¡Debes aceptar el acuerdo de privacidad para continuar!", "#FF6F61", "#FF6F61", "#D6E6F2");
  } else {
    alertInput("¡Datos enviados exitosamente!", "#0a3622", "#0a3622", "#d1e7dd");
    const userDataJSON = JSON.stringify(userData);
    localStorage.setItem("usuario", userDataJSON);
    form.reset();
  }
  
});