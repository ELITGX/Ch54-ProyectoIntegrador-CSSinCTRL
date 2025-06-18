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

    const Email = document.getElementById("Email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Pruebas Validacion de  datos del usuario
    const validationEmail = RegExp (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const validationPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);

    // Validacion de los datos del usuario
    if (!validationEmail.test(Email)) {
        alert("El correo electrónico no es válido.");
        return;
    } 
    
    if (!validationPassword.test(password)) {
        alert("La contraseña es incorrecta.");
        return;
    }

    const storeUser = JSON.parse(localStorage.getItem("usuario"));
    
    if (!storeUser){
        return;
    }

    const hashedInputPassword = await hashPassword(password); // <<< encriptamos la entrada

    if (Email === storeUser.email && hashedInputPassword === storeUser.password) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        window.location.href = "../../../index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});