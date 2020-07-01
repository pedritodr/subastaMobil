// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    document.addEventListener("offline", networkoffline, false);
    document.addEventListener("online", networkonline, false);

    function networkoffline() {

        window.location = 'index.html';
    }

    function networkonline() {

    }

    function cerrar_esto() {
        $("#myModalLoadError").modal('show');
    }




    function onDeviceReady() {
        //  screen.orientation.lock("portrait");

        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var item_auth = get_data_local();

        var networkState = navigator.connection.type;
        if (networkState !== Connection.NONE) {


            if (item_auth) {

                if (item_auth.role_id == 2) {
                    window.location.href = 'dash.html';
                }
            } else {
                window.location.href = 'login.html';
            }




        } else {
            document.getElementsByClassName('received')[0].innerText = "No se encuentra acceso a Internet";
        }


    };




    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
})();