import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath = "../../../"
const localStorageKey = "url";

insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"), homePath);

// Funcion para almacenar el json en local storage
const jsonToLocal = async (url) => {
    if (!localStorage.getItem("url")) {
        let data = await readProducts(url);
        localStorage.setItem("url", JSON.stringify(data))
    }
}


//==================== uso de la api fetch ==========================
const readProducts = async (url) => {

    try {
        const response = await fetch(url);
        console.log(response);
        const datosApi = await response.json();
        console.log(datosApi);
        return datosApi;

    } catch (error) {
        console.log("No se pueden obtener los datos", error);
    }
}

const createProductCars = () => {
    let data = JSON.parse(localStorage.getItem("url"));
    console.log(data);
    const cards = data.results;
    let index = 0; // Índice inicial

    const showCards = () => {
        const contenedor = document.getElementById("contenedorTarjeta");
        contenedor.innerHTML = ""; // Limpiar contenido anterior

        for (let i = 0; i < 3; i++) {
            let indice = (index + i) % cards.length; // Ciclo infinito
            const card = cards[indice];
            const div = document.createElement("div");
            div.classList.add("card");//
            div.innerHTML = 
            `<img src="${card.img}" alt="${card.name}">
            <h4>${card.name}</h4>
            <p>precio $${card.price}</p>
            <p>Stock ${card.stock}</p>`;
            contenedor.appendChild(div);
        }
    };

    // Botón para ir hacia atrás
    document.getElementById("previo").addEventListener("click", () => {
        index = (index - 2 + cards.length) % cards.length;
        showCards();
    });

    // Botón para ir hacia adelante
    document.getElementById("siguiente").addEventListener("click", () => {
        index = (index + 2) % cards.length;
        showCards();
    });

    // Mostrar las primeras cards al cargar
    showCards();
}



// ==================== Inicializar ====================
jsonToLocal("../../../modules/assets/objetos.json").then(() => {
    createProductCars();
});

