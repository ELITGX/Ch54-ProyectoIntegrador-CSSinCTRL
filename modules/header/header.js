

const renderHeaderHTML = (header, homePath = "./") => {

  header.innerHTML = `
    <!-- Navbar (HEADER) -->
    <nav id="header" class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand" href="#">
          <img src="${homePath}images/logoMAMX.png" alt="Logo Medicina Alternativa">
        </a>

        <!-- Botón del menú en móvil -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Contenido colapsable -->
        <div class="collapse navbar-collapse" id="navbarNav">
          
          <!-- Barra de búsqueda centrada -->
          <form class="d-flex mx-auto my-2" role="search" style="width: 100%; max-width: 600px;">
            <!-- Selector de categoría -->
            <select class="form-select me-2" style="min-width: 140px;">
              <option selected>Categoría</option>
              <option value="1">Salud</option>
              <option value="2">Belleza</option>
              <option value="3">Bienestar</option>
            </select>

            <!-- Campo de búsqueda -->
             <div class="container row">
                <input class="form-control me-6" type="search" placeholder="Buscar..." aria-label="Buscar" style="flex: 1; min-width:100px; max-width: 700px;">
              </div>
            <!-- Botón lupa -->
            <button class="btn btn-outline-light" type="submit">
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
              <a class="nav-link" href="${homePath}src/pages/listaItems/listaItems.html">Lista de Ítems</a>
            </li>
            <li class="nav-item" id="formulario-nav">
              <a class="nav-link" href="${homePath}src/pages/formulario/formularioDeCreacion.html">Formulario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${homePath}src/pages/aboutUs/aboutUs.html">Acerca de</a>
            </li>
            <li class="nav-item">
                  <a class="nav-link" href="${homePath}src/pages/ShoppingCart/ShoppingCart.html"><svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 20 20">
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                <path
                  d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </a>
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
      <button class="btn btn-outline-light ms-2" id="cerrar-sesion-btn">Cerrar sesión</button>
  
      <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Cuenta
        </button>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
          <li><button class="btn btn-outline-light ms-2" id="cerrar-sesion-btn">Cerrar sesión</button></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="${homePath}src/pages/registerUser/registerUser.html">Registro</a></li>
        </ul>
      </div>
  
    `;
    const btnCerrarSesion = document.getElementById("cerrar-sesion-btn");
    btnCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = homePath + "index.html";
    });
  } else {
    cuentaNav.innerHTML = `
      <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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


// ESTA es la función que usas en cada página
const insertHeader = (headerElement, homePath = "./") => {
  document.addEventListener("DOMContentLoaded", () => {
    renderHeaderHTML(headerElement, homePath);
    controlarVisibilidadFormulario();
    manejarBotonCuenta(homePath);
  });
};

export { insertHeader };

