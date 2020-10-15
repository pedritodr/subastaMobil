// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    document.addEventListener("offline", networkoffline, false);
    document.addEventListener("online", networkonline, false);

    function networkonline() {
        document.getElementById("mensajeErrorConexion").style.display = "none";
    }

    function networkoffline() {
        document.getElementById("mensajeErrorConexion").style.display = "block";
    }

    function onDeviceReady() {
        setTimeout(function () {
            var item_auth = get_data_local();
            if (item_auth) {
                if (item_auth.role_id == 2) {
                    window.location.href = 'dash.html';
                    document.getElementById("mensajeErrorConexion").style.display = "none";
                }
            } else {
                window.location.href = 'login.html';
                document.getElementById("mensajeErrorConexion").style.display = "none";
            }
        }, 3000);
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        var parentElement = document.getElementById('deviceready');
        if (parentElement) {
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        }

    }

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    }

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    }
})();