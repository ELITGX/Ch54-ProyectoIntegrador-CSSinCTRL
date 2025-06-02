import { postContactRequest } from "../../js/api/postContactRequest.js";
import { isContactRequestValid } from "../../js/contactValidations.js";
import { readInputsContactForm } from "../../js/readInputsContactForm.js";
import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";

insertHeader(document.getElementById("header"));
insertFooter(document.getElementById("footer"));


const contactForm = document.getElementById("contactForm");

contactForm.addEventListener( "submit" , async ( e )=>{
    e.preventDefault(); // evita que se envíe el formulario

    const newContactRequest = readInputsContactForm(contactForm);//se lean los datos del formulario y se crea un objeto con los datos

    const formData = new URLSearchParams();
    for (const key in newContactRequest) {
    formData.append(key, newContactRequest[key]);
    }
    formData.append('_captcha', 'false');

    const validateContactRequest = isContactRequestValid(newContactRequest);// se manda a validar nombre, correo y telefono

    if(validateContactRequest.isValid){
        try
        {
            const response = await postContactRequest( "https://formsubmit.co/97425e8082464ce5f7307c104d63bf08", formData);// se manda a la api el objeto con los datos del formulario           
            document.getElementById('contactForm').reset();
            alert('Formulario enviado con éxito, espera por nuestra respuesta.');
        }
        catch{
            alert("Error al enviar la solicitud de contacto ");// si no se puede enviar la solicitud
        }

    }else{
        alert(validateContactRequest.errors.join("\n"));// se mandan los erroes de validación
    }
} );