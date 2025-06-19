//-------------Importando e insertando footer y header-------------------
import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath = "../../../"

insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"), homePath);

const informationCol = document.getElementById('information-col');
const inputText = document.querySelector('.facturation-input');
let timeout;



const setPaddingInformationCol = () => {
        // Obtener el ancho y el alto en píxeles
        const rowWidth = informationCol.offsetWidth;
        const inputWidth =inputText.offsetWidth;
        const newMargin = parseInt((rowWidth - inputWidth)/2);
        informationCol.style.paddingLeft = newMargin + "px";

    }

window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(setPaddingInformationCol, 100);
});

window.addEventListener('load', () => {
  setPaddingInformationCol();
});

const observer = new ResizeObserver(entries => {
  for (let entry of entries) {
    console.log('Nuevo tamaño:', entry.contentRect.width, entry.contentRect.height);
  }
});

observer.observe(document.querySelector('.facturation-input'));


informationCol.style.padding = 0;
const resizeEvent = new Event('resize');
window.dispatchEvent(resizeEvent);


const getQuantityOfEachProduct = () =>{
    const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    const cartProductsWithQuantity = {};

    for (const product of cartProducts) {
        if (!(product.id in cartProductsWithQuantity)) {
            cartProductsWithQuantity[product.id] = product;
            cartProductsWithQuantity[product.id].quantity = 1;
        }else{
            cartProductsWithQuantity[product.id].quantity += 1;
        }
    }
    return cartProductsWithQuantity;
}


const buildProductCards = (cartProducts) => {
    let cards = "";
    for (const id in cartProducts) {
        cards += `<div class="row row-product">
                <div class="col-2">
                    <img src="${cartProducts[id].img}" alt="imagen del producto" class="productImage">
                </div>
                <div class="col-6 divTextProduct">
                    <p class="productName">${cartProducts[id].name} x ${cartProducts[id].quantity}</p>
                </div>
                <div class="col-4 divTextProduct">
                    <p class="totalProduct">$${cartProducts[id].price * cartProducts[id].quantity} MNX</p>
                </div>
            </div>`
    }
    
    return cards;
}

const insertCardsDom = (tarjetas, idDOM = "products") => {
    const refDom = document.getElementById(idDOM);
    refDom.innerHTML = tarjetas;
}

const createProductCars = () => {
    let products = getQuantityOfEachProduct();
    console.log(products);
    const cards = buildProductCards(products);
    insertCardsDom(cards);
}

createProductCars();