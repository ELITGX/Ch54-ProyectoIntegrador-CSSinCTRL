// Shopping.js 
import { insertHeader } from "../../../modules/header/header.js";
import { insertFooter } from "../../../modules/footer/footer.js";
const homePath ="../../../"
const localStorageKey = "products";

insertHeader(document.getElementById("header"), homePath);
insertFooter(document.getElementById("footer"), homePath);


//==================== uso de la api fetch ==========================
const readProducts = async(url) => {
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
const buildProductCards = (products) => {
  const cards = products.map((product, index) => (
    `<div class="col-auto mt-3">
      <div class="card" style="width: 18rem;">
        <img src="${product.img}" class="card-img-top cardImage mx-auto d-block" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price}</p>
          <button class="btn btn-info view-more-btn" data-index="${index}">Ver más</button>
        </div>
      </div>
    </div>`
  ));
  return cards;
};


const insertCardsDom = (tarjetas, idDOM = "cards") => {
    const refDom = document.getElementById(idDOM);
    refDom.innerHTML = tarjetas.join("");
}

// Función para agregar productos al carrito
const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

const createProductCars = () => {
    let data = JSON.parse(localStorage.getItem(localStorageKey));
    console.log(data);
    const products = data.results;
    const cards = buildProductCards(products);
    insertCardsDom(cards);

    document.querySelectorAll(".view-more-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    const product = products[index];

    // Rellenar datos del modal
    document.getElementById("modalProductImg").src = product.img;
    document.getElementById("modalProductName").textContent = product.name;
    document.getElementById("modalProductDesc").textContent = product.description;
    document.getElementById("modalProductPrice").textContent = product.price;
    document.getElementById("modalProductPres").textContent = product.presentation;
    document.getElementById("modalProductConc").textContent = product.concentration;
    document.getElementById("modalProductVia").textContent = product.administrationRoute;

    // Botón "Añadir al carrito" dentro del modal
    document.getElementById("modalAddToCart").onclick = () => {
      addToCart(product);
      alert(`${product.name} añadido al carrito`);
      bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    };

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  });
});

    // Escuchar clicks en botones de "Añadir al carrito"
    document.querySelectorAll(".btn.btn-primary").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const product = products[index];
            addToCart(product);
            alert(`${product.name} se agregó al carrito`);
        });
    });
}

// Funcion para almacenar el json en local storage
const jsonToLocal = async(url) => {
    if (!localStorage.getItem(localStorageKey) || localStorage.getItem(localStorageKey).includes("nombre:")){
        let data = await readProducts(url);
        localStorage.setItem(localStorageKey, JSON.stringify(data))
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
