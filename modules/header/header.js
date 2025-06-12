

const insertHeader = (header, homePath ="./") => {

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
            <li class="nav-item">
              <a class="nav-link" href="${homePath}src/pages/listaItems/listaItems.html">Lista de Ítems</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${homePath}src/pages/formulario/formularioDeCreacion.html">Formulario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${homePath}src/pages/aboutUs/aboutUs.html">Acerca de</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${homePath}src/pages/ShoppingCart/ShoppingCart.html">Carrito</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-mamx" href="${homePath}src/pages/contact/contact.html">Contáctanos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `
}

export {insertHeader};