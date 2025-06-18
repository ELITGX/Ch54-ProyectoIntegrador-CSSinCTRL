const form = document.getElementById("logInButton");
form.addEventListener("submit", event => {
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

    if (Email == storeUser.email && password == storeUser.password) {//Comprobación de inicio de sesión
        alert("¡Bienvenido/a! ¡Has iniciado sesión correctamente!");
        window.location.href = "../../../index.html"; // Redirige al usuario a la página principal
        const boolean = true;
        localStorage.setItem("isLoggedIn", JSON.stringify(boolean)); // Guarda el estado de sesion iniciada
    } else {
        alert("Correo incorrecto");
    }
});