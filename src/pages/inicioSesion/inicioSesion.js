const form = document.getElementById("logInButton");

// Función para encriptar la contraseña con SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

form.addEventListener("submit", async event => {
    event.preventDefault();// previene el envío del formulario


    // Crear el objeto directamente mientras se obtienen los valores de los inputs
    const emailInput = document.getElementById ("email");
    const passwordInput = document.getElementById ("password");
    const emailError = document.getElementById ("emailError");
    const passwordError = document.getElementById ("passwordError");
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Pruebas Validacion de  datos del usuario
    const validationEmail =RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const validationPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);

    let isValid = true;

    // Validacion de los datos del usuario
    if (!validationEmail.test(email)) {
        emailError.textContent = "El correo electrónico no es válido.";
        emailError.classList.remove("d-none");
        isValid = false;
    } 
    
    if (!validationPassword.test(password)) {
        passwordError.classList.remove("d-none");
        passwordError.textContent = "La contraseña no cumple con los requisitos.";
        isValid = false;
    }

    if(!isValid) return;

    const storeUser = JSON.parse(localStorage.getItem("usuario"));
    
    if (!storeUser){
        passwordError.textContent = "No se encontró un usuario registrado.";
        passwordError.classList.remove("d-none");
        return;
    }

    const hashedInputPassword = await hashPassword(password); // <<< encriptamos la entrada

    if (email === storeUser.email && hashedInputPassword === storeUser.password) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        window.location.href = "../../../index.html";
    } else {
        passwordError.textContent = "Correo o contraseña incorrectos.";
        passwordError.classList.remove("d-none");   
    }
});