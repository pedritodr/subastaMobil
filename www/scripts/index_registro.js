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

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);


        /*  window.FirebasePlugin.onNotificationOpen(function(notification) {
              navigator.notification.alert(
                  notification.body,  // message
                  cerrar_push,        // callback
                  notification.title, // title
                  'Aceptar'           // buttonName
              );

             
           }, function(error) {
              // show_error(error);
           });
           */

        //  FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

        $("#section_content_register").show();





    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
})();