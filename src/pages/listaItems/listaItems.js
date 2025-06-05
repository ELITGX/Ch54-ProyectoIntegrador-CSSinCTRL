import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath ="../../../"

insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"));


//==================== uso de la api fetch ==========================
const readProducts = async(url) =>{

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

// Esta funcion es para renderizar el producto

const buildProductCards = ( productos ) => {
    const cards = productos.map( (product)=>(
        `<div class="col-auto mt-3">
            <div class="card" style="width: 18rem;">
                <img src=${product.img} class="card-img-top cardImage mx-auto d-block" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.precio}</p>
                    <a href="#" class="btn btn-primary"> Añadir al carrito </a>
                </div>
            </div>
        </div>`
    ) );
    return cards;
}

const insertCardsDom = (tarjetas, idDOM = "cards")=>{
    const refDom =  document.getElementById( idDOM );
    refDom.innerHTML = tarjetas.join("");
}

const createProductCars = async (url)=>{
    let data = await readProducts(url);
    console.log(data);
    const products = data.results;
    const  cards= buildProductCards(products);
    insertCardsDom(cards);
}

createProductCars("../../../modules/assets/objetos.json");

const eliminate