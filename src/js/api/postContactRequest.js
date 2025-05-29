const postContactRequest = async ( url, contactRequest ) => {

    const options = {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" // Tipo de contenido
        },
        body: contactRequest.toString() // Cuerpo de la petición
    }
    console.log(contactRequest.toString());
    const response = await fetch( url, options);
    console.log( "Respuesta del servidor:", response );
    if ( !response.ok  ) {
        // Si la respuesta no es correcta, lanzar un error
        throw new Error(`Error al enviar el formulario de contacto: ${response.statusText}`);
    }
}



export { postContactRequest  };