﻿// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
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


    var subasta_id = 0;

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        cargar_datos_perfil();
        screen.orientation.lock("portrait");
        subasta_id = window.location.href;
        subasta_id = subasta_id.split('=');
        id = subasta_id[1];


        var item_auth = get_data_local();

        if (!item_auth) {
            cerrar_session();
        } else {
            if (item_auth.id == 0) {
                cerrar_session();
            }
        }

    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
})();