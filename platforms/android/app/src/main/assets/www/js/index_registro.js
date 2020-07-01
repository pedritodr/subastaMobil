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

    function isAvailableSuccess(result) {
        
    }

    function isAvailableError(message) {
        $("#section_hella_dactilar").hide();
    }

    function geolocationSuccess(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $.get("https://api.opencagedata.com/geocode/v1/json?q="+lat+"+"+lng+"&pretty=1&key=e2bedd788726473e8b68334f0713b754", function(data, status){
       
            if(data.status.code == 200){
                var result_country = data.results[0].components.country_code.toUpperCase();            
                var index_country = find_available_country(result_country);               
                if(index_country == -1){
                    navigator.notification.alert(
                        'El país desde el que se conecta no tiene servicio aún para PAGAHOY.',  // message
                        cerrar_esto,        // callback
                        'País sin servicio', // title
                        'Aceptar'           // buttonName
                    );
                }else{
                    localStorage.setItem("country_code",result_country);
                    localStorage.setItem("country_flag",available_countries[index_country].flag);

                    
                }
            }else{
                navigator.notification.alert(
                    'Por el momento no puede utilizar los servicios de PagaHoy. Intente mas tarde',  // message
                    cerrar_esto,        // callback
                    'Servicio no disponible en este momento', // title
                    'Aceptar'           // buttonName
                );
            }
       
        });
    }

    function geolocationError(error){
        navigator.notification.alert(
            'Por el momento no puede utilizar los servicios de PagaHoy. Intente activar el GPS e intente de nuevo.',  // message
            cerrar_esto,        // callback
            'Servicio no disponible en este momento', // title
            'Aceptar'           // buttonName
        );
    }

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError);      

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
} )();