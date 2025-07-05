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
    /*const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;*/
    return CryptoJS.SHA256(password).toString();
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

    // Validaciones
    if (!validationName.test(name)) {
      alertInput("Ingresa tu nombre correctamente", "errorName");
    } else if (!validatioLastName.test(lastName)) {
      alertInput("Ingresa tus apellidos correctamente", "errorLastName");
    } else if (!validationPhone.test(phone)) {
      alertInput("Ingresa un número de teléfono válido", "errorPhone");
    } else if (!validationEmail.test(email)) {
      alertInput("Ingresa una dirección de correo electrónico válida", "errorEmail");
    } else if (!validationPassword.test(password)) {
      alertInput("Contraseña inválida", "errorPassword");
    } else if (password !== passwordConfirm) {
      alertInput("Las contraseñas no coinciden", "errorConfirm");
    } else if (!termsAndConditions) {
      alertInput("Debes aceptar términos y condiciones", "errorConditions");
    } else if (!privacityAgreement) {
      alertInput("Debes aceptar el acuerdo de privacidad", "errorPrivacity");
    } else {

      try {
       
        const emailCheck = await fetch(`http://localhost:8081/api/v1/users/email/${encodeURIComponent(email)}`); 

        if (emailCheck.ok) {
          
          alertInput("Este correo ya está registrado. Ingresa un correo distinto", "errorEmail");
          return;
        }

      } catch (error) {
        console.error("Error al verificar el correo:", error);
        alert("Error al verificar el correo. Intenta más tarde.");
        return;
      }

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
          password: hashedPassword,
          roles
        };
        try {
          const response = await fetch("http://localhost:8081/api/v1/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSend)
          });

          if (response.ok) {
            window.location.href = "../inicioSesion/inicioSesion.html";
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