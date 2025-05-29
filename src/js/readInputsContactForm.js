const readInputsContactForm = ( form ) => {
    const newContactRequest = {
        /* se leen los valores del fdormulario y se asiganan al objeto,se usa trim() para eliminar espacios en blanco al inicio y al final */

        name: form.elements["name"].value.trim(),
        email: form.elements["email"].value.trim(),
        phone: form.elements["phone"].value.trim(),
        message: form.elements["message"].value.trim()

    }
    return newContactRequest;

};



export{ readInputsContactForm };