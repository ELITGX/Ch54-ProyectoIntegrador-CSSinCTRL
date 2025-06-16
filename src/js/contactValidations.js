export { isContactRequestValid };


/**
 * Valida si la solicitud de contacto es válida
 * @param {object} contactRequest - Objeto que representa a la solicitud enviada para contacto
 * @property {string} contactRequest.name - Nombre del usuario
 * @property {string} contactRequest.email - Correo electrónico del usuario
 * @returns 
 */


const isContactRequestValid = (contactRequest) => { 
    const result = {
        isValid: true,
        errors: []
    };
    /*validar los atributos del usuario*/
    const nameValidation = validateName(contactRequest.name);
    if (nameValidation.isValid === false) {
        result.isValid = false;
        result.errors.push(nameValidation.errors);
    }
    const emailValidation = validateEmail(contactRequest.email);
    if(!emailValidation.isValid){
        result.isValid = false;
        result.errors.push(emailValidation.errors);
    }
    const phoneValidation = validatePhone(contactRequest.phone);
    if(!phoneValidation.isValid){
        result.isValid = false;
        result.errors.push(phoneValidation.errors);
    }
    const messageValidation = validateMessage(contactRequest.message);
    if(!messageValidation.isValid){
        result.isValid = false;
        result.errors.push(messageValidation.errors);
    }
    return result;


    
}


const validateName = (name) => {
    const result = {
        isValid: true,
        errors: []
    };
    if (name === "") {// Validar que el nombre no esté vacío
        result.isValid = false;
        result.errors.push("El nombre no debe estar vacío");
    } else if (name.length < 3) {// Validar que el nombre tenga al menos 3 caracteres
        result.isValid = false;
        result.errors.push("El nombre debe tener al menos 3 caracteres");
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {// Validar que el nombre solo contenga letras y espacios
        result.errors.push("El nombre solo puede contener letras y espacios.");
    }
    return result;
}

const validateEmail = (email) => {
    const result = {
        isValid: true,
        errors: []
    };
    const re = RegExp('.+@.+\\..+');// se crea una expsesión regular para validar el correo electrónico
    if(!re.test(email))//se valida el correo electrónico con la expresión regular
    {
        result.isValid = false;
        result.errors.push("El correo ingresado no es válido, favor de verificarlo.");
    }
    return result;

}

const validatePhone = (phone) => {
    const result = {
        isValid: true,
        errors: []
    };
    const re = RegExp('^\\d{10}$');// se crea una expsesión regular para validar el número de teléfono(debe tener 10 dígitos)
    if(!re.test(phone))//se valida el numero de telefono con la expresión regular
    {
        result.isValid = false;
        result.errors.push("El teléfono ingresado no es válido, favor de verificarlo.");
    }
    return result;

}

const validateMessage = (message) => {
    const result = {
        isValid: true,
        errors: []
    };
    if (message === "") {// Validar que el mensaje no esté vacío
        result.isValid = false;
        result.errors.push("El mensaje no debe estar vacío");
    } 
    return result;
}