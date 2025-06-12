

const insertFooter = (footer, homePath = "./") => {
    footer.innerHTML = `
    <div class="conteiner">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <h3>Exclusivo</h3>
                    <!-- Debe ir a la página de inicio de sesión -->
                    <a href=""><p>Suscribete y obtén un 10% de descuento</p></a>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3 soporte">
                    <h3>Soporte</h3>
                        <i class="bi bi-whatsapp">     +52 55 6232 2433</i>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <h3>Cuenta</h3>
                    <!-- Debe ir a tu perfil de usuario -->
                    <a href="${homePath}src/pages/registerUser/registerUser.html">Mi cuenta</a>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3 contacto">
                    <h3>Contacto</h3>
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