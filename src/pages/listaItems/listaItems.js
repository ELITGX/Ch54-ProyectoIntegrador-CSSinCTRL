import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath ="../../../"
const localStorageKey = "url";

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

const createProductCars = ()=>{
    let data = JSON.parse(localStorage.getItem("url"));
    console.log(data);
    const products = data.results;
    const  cards= buildProductCards(products);
    insertCardsDom(cards);
}



// Funcion para almacenar el json en local storage
const jsonToLocal = async(url) =>{
    if (!localStorage.getItem("url")){
        let data = await readProducts(url);
        localStorage.setItem("url", JSON.stringify(data))
    }
}



// Agregar producto
const addProduct = (newProduct) => {
    const data = JSON.parse(localStorage.getItem(localStorageKey));
    if (data?.results) {
        data.results.push(newProduct);
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        createProductCars();
    }
};

// Modificar producto por ID
const updateProductById = (id, updatedFields) => {
    const data = JSON.parse(localStorage.getItem(localStorageKey));
    if (data?.results) {
        data.results = data.results.map(product =>
            product.id === id ? { ...product, ...updatedFields } : product
        );
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        createProductCars();
    }
};

// Eliminar producto por ID o nombre
const deleteProduct = ({ id, name }) => {
    const data = JSON.parse(localStorage.getItem(localStorageKey));
    if (data?.results) {
        data.results = data.results.filter(product =>
            (id ? product.id !== id : true) &&
            (name ? product.name.toLowerCase() !== name.toLowerCase() : true)
        );
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        createProductCars();
    }
};

// Eliminar todos los productos
const clearAllProducts = () => {
    const data = JSON.parse(localStorage.getItem(localStorageKey));
    if (data) {
        data.results = [];
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        createProductCars();
    }
};

// ==================== Inicializar ====================
jsonToLocal("../../../modules/assets/objetos.json").then(() => {
    createProductCars();
});



//Codigo usado para probar funciones

/* const newProduct = {
    id: 12,
    name: "Selenio Orgánico",
    img: "../../../images/Productos/selenio.png",
    description: "El selenio orgánico es ideal para tu cuerpo: desintoxica el hígado, promoviendo su buen funcionamiento. Fortalece el sistema inmunológico y refuerza las defensas al aumentar el número de células protectoras. Regenera las vitaminas C y E, manteniendo el cuerpo lleno de energía y vitalidad. Pero eso no es todo: combate la inflamación, aliviando dolores y molestias. Ayuda a prevenir el cáncer gracias a su acción sobre la metilación del ADN. Descubre cómo este potente antioxidante puede revolucionar tu práctica.",
    precio: 60,
    presentacion: "10 ml",
    concentracion: "150 mg/ml",
    viaAdministracion: "intravenoso",
    stock: 100
}

const newProduct2 = {
    id: 12,
    name: "Selenio Orgánico Modificado",
    img: "../../../images/Productos/selenio.png",
    precio: 1234,
}

addProduct(newProduct);
updateProductById(4,newProduct2);
clearAllProducts();
deleteProduct({name:"MELATONINA"}); */