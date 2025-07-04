

const insertFooter = (footer, homePath = "./") => {
    footer.innerHTML = `
    <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-4 exclusivo">
                    <h3>Exclusivo</h3>
                    <!-- Debe ir a la página de inicio de sesión -->
                    <a href="${homePath}src/pages/registerUser/registerUser.html"><p id="exc">Suscribete y obtén un 10% de descuento</p></a>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-4 soporte">
                    <h3>Soporte</h3>
                        <i class="bi bi-whatsapp">     +52 55 6232 2433</i>
                </div>
                <!--<div class="col-sm-12 col-md-12 col-lg-4 cuenta">
                    <h3>Cuenta</h3>-->
                    <!-- Debe ir a tu perfil de usuario -->
                    <!--<a href="${homePath}src/pages/registerUser/registerUser.html">Mi cuenta</a>
                </div>-->
                <div class="col-sm-12 col-md-12 col-lg-4 contacto">
                    <h3><a id="exc" href="${homePath}src/pages/contact/contact.html">Contáctanos</a></h3>
                     <i class="bi bi-envelope">medicinamexico417@gmail.com</i>
                </div>
            </div>
            <div class="row">
                <p class="copyright">Copyright © 2025 Todos los derechos reservados - Medicinas alternativas Mx</p>
            </div>
        </div>
    `
}

export{insertFooter};