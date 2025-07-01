

const renderHeaderHTML = (header, homePath = "./") => {

  header.innerHTML = `
    <!-- Navbar (HEADER) -->
    <nav id="header" class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand" href="#">
          <img src="${homePath}images/logoMAMX.png" alt="Logo Medicina Alternativa">
        </a>

        <div class="d-flex align-items-center ms-auto order-lg-2">
          <!-- Botón del menú en móvil -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="position-relative">
            <a class="nav-link" href="${homePath}/src/pages/ShoppingCart/ShoppingCart.html">
              <i class="bi bi-cart-plus cart-icon"></i>
            </a>
            <!-- Badge -->
            <span class="position-absolute translate-middle badge rounded-pill bg-danger " id="cartBadge">
              9+
            </span>
          </div>
        </div>

        <!-- Contenido colapsable -->
        <div class="collapse navbar-collapse order-lg-1" id="navbarNav">
          
          <!-- Barra de búsqueda centrada -->
          <form class="d-flex mx-auto my-2" role="search" style="width: 100%; max-width: 600px;">
            <!-- Selector de categoría -->
            <!--
            <select class="form-select me-2" style="min-width: 140px;">
              <option selected>Categoría</option>
              <option value="1">Salud</option>
              <option value="2">Belleza</option>
              <option value="3">Bienestar</option>
            </select>
            -->

            <!-- Campo de búsqueda -->
             <div class="container row">
                <input class="form-control me-6" type="search" placeholder="Buscar..." aria-label="Buscar" style="flex: 1; min-width:100px; max-width: 700px;">
              </div>
            <!-- Botón lupa -->
            <button class="btn btn-outline-primary" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>

          <!-- Enlaces del navbar alineados a la derecha -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" href="${homePath}index.html">Inicio</a>
            </li>

          <li class="nav-item" id="cuenta-nav">
            <!-- El contenido se reemplazará dinámicamente por login/logout -->
          </li>


            <li class="nav-item">
              <a class="nav-link" href="${homePath}src/pages/listaItems/listaItems.html">Productos</a>
            </li>
            <li class="nav-item" id="formulario-nav">
              <a class="nav-link" href="${homePath}src/pages/formulario/formularioDeCreacion.html">Formulario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${homePath}src/pages/aboutUs/aboutUs.html">Acerca de</a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    `
}

// Verifica si el usuario está logueado para mostrar u ocultar el botón del formulario
const controlarVisibilidadFormulario = () => {
  const formularioNav = document.getElementById("formulario-nav");
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (formularioNav) {
    formularioNav.style.display = isLoggedIn ? "block" : "none";
  }
};

const manejarBotonCuenta = (homePath) => {
  const cuentaNav = document.getElementById("cuenta-nav");
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (!cuentaNav) return;

  if (isLoggedIn) {
    cuentaNav.innerHTML = `
      <div class="nav-item dropdown">
        <button class="nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Mi cuenta
        </button>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
          <li><a class="dropdown-item" href="${homePath}src/pages/editarPerfil/editarPerfil.html">Editar perfil</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item text-danger" id="cerrar-sesion-btn">Cerrar sesión</button></li>
        </ul>
      </div>
    `;

    // Listener para cerrar sesión
    const btnCerrarSesion = document.getElementById("cerrar-sesion-btn");
    btnCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = homePath + "src/pages/inicioSesion/inicioSesion.html";
    });

  } else {
    cuentaNav.innerHTML = `
      <div class="nav-item dropdown">
        <button class="nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Cuenta
        </button>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
          <li><a class="dropdown-item active" href="${homePath}src/pages/inicioSesion/inicioSesion.html">Inicio de sesión</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="${homePath}src/pages/registerUser/registerUser.html">Registro</a></li>
        </ul>
      </div>
    `;
  }
};


const getNumberCartItems = () =>{
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBadge = document.getElementById("cartBadge");
    
  if(cartProducts.length > 0){
    cartBadge.style.display = "block";
    if(cartProducts.length > 9)
    {
      cartBadge.style.right = "-20px;"
      cartBadge.innerText = "9+";
    }else{
      cartBadge.style.right = "-15px;"
      cartBadge.innerText = cartProducts.length;
    }
  }else{
    cartBadge.style.display = "none";
  }
}



// ESTA es la función que usas en cada página
const insertHeader = (headerElement, homePath = "./") => {
  document.addEventListener("DOMContentLoaded", () => {
    renderHeaderHTML(headerElement, homePath);
    controlarVisibilidadFormulario();
    manejarBotonCuenta(homePath);
    getNumberCartItems();
  });
};

export { insertHeader,getNumberCartItems };

