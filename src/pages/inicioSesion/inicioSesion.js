const form = document.getElementById("logInButton");
form.addEventListener("submit", event => {
    event.preventDefault();// previene el envío del formulario


    // Crear el objeto directamente mientras se obtienen los valores de los inputs
    const userData = {

        phoneOrEmail: document.getElementById("form2Example11").value,
        password: document.getElementById("password").value,
    };

    const { phoneOrEmail, password } = userData;


    // Pruebas Validacion de  datos del usuario
    let validationEmail = RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    let validationPhone = RegExp("^\\d{10}$");
    let validationPassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$");

    // Validacion de los datos del usuario
    if (!validationEmail.test(phoneOrEmail) && !validationPhone.test(phoneOrEmail)) {
        alert("El correo electrónico o número de teléfono no es válido.");
        return;
    } else if (!validationPassword.test(password)) {
        alert("La contraseña es incorrecta.");
        return;
    } else if ((userData.phoneOrEmail == localStorage.getItem("email") || userData.phoneOrEmail == localStorage.getItem("phone")) 
                && userData.password == localStorage.getItem("password")) {//Comprobación de inicio de sesión
        alertInput("¡Biuenvenvenido/a!", "¡Has iniciado sesión correctamente!");
    }

});