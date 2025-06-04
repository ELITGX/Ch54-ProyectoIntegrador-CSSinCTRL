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



const buildProductCards = ( personajes ) => {
    const cards = personajes.map( (product)=>(
        `<div class="card" style="width: 18rem;">
        <img src=${product.iamgen} class="card-img-top cardImage mx-auto d-block" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.nombre}</h5>
            <p class="card-text">$${product.precio}</p>
            <a href="#" class="btn btn-primary"> Añadir </a>
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
    console.log(varData);
    const products = varData.results;
    const  cards= buildProductCards(products);
    insertCardsDom(cards);
}