const form = document.getElementById("logInButton");

// Función para encriptar la contraseña con SHA-256
async function hashPassword(password) {
    /* const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex; */
    return CryptoJS.SHA256(password).toString();
}

form.addEventListener("submit", async event => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    let isValid = true;

    emailError.classList.add("d-none");
    passwordError.classList.add("d-none");

    if (!validationEmail.test(email)) {
        emailError.textContent = "El correo electrónico no es válido.";
        emailError.classList.remove("d-none");
        isValid = false;
    }

    if (!validationPassword.test(password)) {
        passwordError.textContent = "La contraseña no cumple con los requisitos.";
        passwordError.classList.remove("d-none");
        isValid = false;
    }

    if (!isValid) return;

    try {
        const response = await fetch(`http://localhost:8081/api/v1/users/email/${encodeURIComponent(email)}`);
        
        if (!response.ok) {
            emailError.textContent = "El correo no está registrado.";
            emailError.classList.remove("d-none");
            return;
        }

        const user = await response.json();

        const hashedInputPassword = await hashPassword(password);

        if (user.password === hashedInputPassword) {
            localStorage.setItem("isLoggedIn", JSON.stringify(true));
            localStorage.setItem("userName", user.name); // opcional
            window.location.href = "../../../index.html";
        } else {
            passwordError.textContent = "Correo o contraseña incorrectos.";
            passwordError.classList.remove("d-none");
        }

    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        passwordError.textContent = "Error de servidor";
        passwordError.classList.remove("d-none");
    }
});