
//************************************************************************************************************* */

async function myFunction() { }
const leerProductos = async (url) => {
    try {
        const response = await fetch(url); // Obtener los datos en formato JSON; fetch es una API que es una promesa
        //console.log(response);
        const datosApi = await response.json(); // Convertir de JSON a objetos de JavaScript
        //console.log(datosApi);
        return datosApi;
    } catch (error) {
        console.log("no se pudo obtener el dato", error);
    }

}
const contruirTarjetasDeRickandMorty = ( personajes ) => {
    const tarjetas = personajes.map( (personaje, index, array)=>(//map manda parametro de valor, index y array
    `<div class="col-12 col-md-4 col-lg-3">
        <div class="card">
            <img src="${personaje.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
            <a href="#" class="btn btn-primary">${personaje.species}</a>
            </div>
        </div> 
    </div>`
    ) );
    return tarjetas;
}

// const insertarTarjetasAlDom = (tarjetas, idDOM = "cards")=>{
//     const refDom =  document.getElementById( idDOM );
//     refDom.innerHTML = refDom.innerHTML+tarjetas.join("");// se utiliza join porque al convertir un array en strin js agrega "," y con join lo evitamos
// }

const crearCarsDeRickAndMorty = async (url) => {
    const data = await leerProductos(url);
    const personajes = data.results;
    console.log(personajes);
    const tarjetas = contruirTarjetasDeRickandMorty( personajes);
    insertarTarjetasAlDom( tarjetas );
}


crearCarsDeRickAndMorty("../../../modules/assets/objetos.json");//https://rickandmortyapi.com/api/character

