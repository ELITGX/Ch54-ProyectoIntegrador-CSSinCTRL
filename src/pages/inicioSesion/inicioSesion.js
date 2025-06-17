const form = document.getElementById("logInButton");
form.addEventListener("submit", event => {
    event.preventDefault();// previene el envío del formulario


    // Crear el objeto directamente mientras se obtienen los valores de los inputs
    

    const Email = document.getElementById("Email").value.trim();
    const password = document.getElementById("password").value.trim();
   

    
    // Pruebas Validacion de  datos del usuario
    const validationEmail = RegExp (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const validationPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);


    console.log("Validaciones ");
    // Validacion de los datos del usuario
    if (!validationEmail.test(Email)) {
        alert("El correo electrónico no es válido.");
        console.log("Validacion correo");
        return;
    } 
    
    if (!validationPassword.test(password)) {
        alert("La contraseña es incorrecta.");
        console.log("Validacion Password");
        return;
    }
      console.log("Post validacion");

    const storeUser = JSON.parse(localStorage.getItem("usuario"));
    
    if (!storeUser){
        alert("No hay registros");
        return;
    }

    if (Email == storeUser.email && password == storeUser.password) {//Comprobación de inicio de sesión
        alert("¡Bienvenudo/a! ¡Has iniciado sesión correctamente!");
        console.log(" validacion cuenta");
    } else {
        alert("Correo incorrecto");
    }
        console.log("Post todo");
});