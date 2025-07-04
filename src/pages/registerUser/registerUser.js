/* document.addEventListener("DOMContentLoaded", () => {

  function openModal() {
    const modal = document.getElementById("successModal");
    modal.classList.add("show");

    setTimeout(() => {
      modal.classList.remove("show");
    }, 5000);
  }

  const form = document.getElementById("registerUser");

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const userData = {
      nameUser: document.getElementById("nameUser").value.trim(),
      lastNameUser: document.getElementById("lastNameUser").value.trim(),
      phone: document.getElementById("phoneUser").value.trim(),
      email: document.getElementById("emailUser").value.trim(),
      password: document.getElementById("passwordUser").value,
      passwordConfirm: document.getElementById("passwordConfirm").value,
      termsAndConditions: document.getElementById("checkConditions").checked,
      privacityAgreement: document.getElementById("checkPrivacity").checked
    };

    // ================================ Desestructuración ==============================================

    const { nameUser:name, lastNameUser:lastName, phone, email, password, passwordConfirm, termsAndConditions, privacityAgreement } = userData;

    //  ================ Validaciones de entradas de usuario ======================================

    const validationName = /^[A-ZÁÉÍÓÚÑa-záéíóúñ]{2,}(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]{2,})*$/;
    const validatioLastName = /^[A-ZÁÉÍÓÚÑa-záéíóúñ]{2,}(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]{2,})+$/;
    const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validationPhone = /^\d{10}$/;
    const validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,25}$/;

    // ======================== Alertas de bootstrap ===========================================

    const alertInput = (message, color, borderColor, backgroundColor, id) => {
        const target = document.getElementById(id);
        target.innerHTML = `<span style="color:rgb(163, 18, 5);">${message}</span>`;

        setTimeout(() => {
            target.innerHTML = ``;
        }, 5000);
    };

    // ========================================== Validación de inputs ==========================================

    const storedUserJSON = localStorage.getItem("usuario");
    const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;

    if (!validationName.test(name)) {
      alertInput("Ingresa tu nombre correctamente", "#FF6F61", "#FF6F61", "#D6E6F2", "errorName");
    } else if (!validatioLastName.test(lastName)) {
      alertInput("Ingresa tus apellidos correctamente", "#FF6F61", "#FF6F61", "#D6E6F2", "errorLastName");
    } else if (!validationPhone.test(phone)) {
      alertInput("Ingresa un número de teléfono válido", "#FF6F61", "#FF6F61", "#D6E6F2", "errorPhone");
    } else if (!validationEmail.test(email)) {
      alertInput('Ingresa una dirección de correo electrónico válida', "#FF6F61", "#FF6F61", "#D6E6F2", "errorEmail");
    } else if (storedUser && storedUser.email === email) {
      alertInput('Este correo ya está registrado. Intente con uno diferente', "#FF6F61", "#FF6F61", "#D6E6F2", "errorEmail");
    } else if (!validationPassword.test(password)) {
      alertInput("Contraseña inválida", "#FF6F61", "#FF6F61", "#D6E6F2", "errorPassword");
    } else if (password !== passwordConfirm) {
      alertInput("Las contraseñas no coinciden", "#FF6F61", "#FF6F61", "#D6E6F2", "errorConfirm");
    } else if (!termsAndConditions) {
      alertInput("Debes aceptar términos y condiciones", "#FF6F61", "#FF6F61", "#D6E6F2", "errorConditions");
    } else if (!privacityAgreement) {
      alertInput("Debes aceptar el acuerdo de privacidad", "#FF6F61", "#FF6F61", "#D6E6F2", "errorPrivacity");
    } else {
      form.reset();
      openModal();

      setTimeout(async () => {
        // Cierra el modal 
        const modal = document.getElementById("successModal");
        modal.classList.remove("show");

        // Continuación del flujo
        const hashedPassword = await hashPassword(password);
        const userToStore = {
          name,
          lastName,
          phone,
          email,
          password: hashedPassword,
          termsAndConditions,
          privacityAgreement
        };

        localStorage.setItem("usuario", JSON.stringify(userToStore));

        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        window.location.href = "../../../index.html";
        
      }, 5000);

      
    }
  });
}); */


document.addEventListener("DOMContentLoaded", () => {

  function openModal() {
    const modal = document.getElementById("successModal");
    modal.classList.add("show");

    setTimeout(() => {
      modal.classList.remove("show");
    }, 5000);
  }

  const form = document.getElementById("registerUser");

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const userData = {
      nameUser: document.getElementById("nameUser").value.trim(),
      lastNameUser: document.getElementById("lastNameUser").value.trim(),
      phone: document.getElementById("phoneUser").value.trim(),
      email: document.getElementById("emailUser").value.trim(),
      password: document.getElementById("passwordUser").value,
      passwordConfirm: document.getElementById("passwordConfirm").value,
      termsAndConditions: document.getElementById("checkConditions").checked,
      privacityAgreement: document.getElementById("checkPrivacity").checked
    };

    const { nameUser: name, lastNameUser: lastName, phone, email, password, passwordConfirm, termsAndConditions, privacityAgreement } = userData;

    // Validaciones
    const validationName = /^[A-ZÁÉÍÓÚÑa-záéíóúñ]{2,}(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]{2,})*$/;
    const validatioLastName = /^[A-ZÁÉÍÓÚÑa-záéíóúñ]{2,}(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]{2,})+$/;
    const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validationPhone = /^\d{10}$/;
    const validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,25}$/;

    const alertInput = (message, id) => {
      const target = document.getElementById(id);
      target.innerHTML = `<span style="color:rgb(163, 18, 5);">${message}</span>`;
      setTimeout(() => {
        target.innerHTML = ``;
      }, 5000);
    };

    // ELIMINADO: validación contra localStorage de correos duplicados
    // const storedUserJSON = localStorage.getItem("usuario");
    // const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;

    // Validaciones
    if (!validationName.test(name)) {
      alertInput("Ingresa tu nombre correctamente", "errorName");
    } else if (!validatioLastName.test(lastName)) {
      alertInput("Ingresa tus apellidos correctamente", "errorLastName");
    } else if (!validationPhone.test(phone)) {
      alertInput("Ingresa un número de teléfono válido", "errorPhone");
    } else if (!validationEmail.test(email)) {
      alertInput("Ingresa una dirección de correo electrónico válida", "errorEmail");
    // ELIMINADO: comparación contra correo en localStorage
    // } else if (storedUser && storedUser.email === email) {
    //   alertInput('Este correo ya está registrado.', "#FF6F61", "#FF6F61", "#D6E6F2", "errorEmail");
    } else if (!validationPassword.test(password)) {
      alertInput("Contraseña inválida", "errorPassword");
    } else if (password !== passwordConfirm) {
      alertInput("Las contraseñas no coinciden", "errorConfirm");
    } else if (!termsAndConditions) {
      alertInput("Debes aceptar términos y condiciones", "errorConditions");
    } else if (!privacityAgreement) {
      alertInput("Debes aceptar el acuerdo de privacidad", "errorPrivacity");
    } else {
      form.reset();
      openModal();

      setTimeout(async () => {
        const modal = document.getElementById("successModal");
        modal.classList.remove("show");

        const hashedPassword = await hashPassword(password);

        const userToSend = {
          name,
          lastName,
          phone,
          email,
          password: hashedPassword
        };
        try {
          const response = await fetch("http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSend)
          });

          if (response.ok) {
            window.location.href = "../../../index.html";
          } else {
            const errorData = await response.json();
            console.error("Error en el servidor:", errorData);
            alert("Ocurrió un error al registrar. Intenta de nuevo.");
          }
        } catch (error) {
          console.error("Error en la petición:", error);
          alert("No se pudo conectar con el servidor.");
        }

      }, 5000);
    }
  });
});