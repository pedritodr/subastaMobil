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

    
    function pintar_items(lista, id) {
        $("#" + id).empty();
        var item = "";
        for (var i = 0; i < lista.length; i++) {
            item + "<div class='row' style='margin-right:0px;'>";
            item += "<div class='col-xs-12' style='border-bottom:1px solid lightgray;'>";
            item += "<span style='color:#077bbf;font-weight:bold;'><i class='glyphicon glyphicon-time'></i> " + lista[i].fecha_hora + "<span> " + "<span style='margin-left:15px;color:#116d06;font-weight:bold;font-size:18px;'>$ " + lista[i].monto + "</span> <br />"; 
            item += "<span style='color:#023186;font-weight:bold;'><i class='glyphicon glyphicon-home'></i> " + lista[i].nombre_tienda + "<span>";
            if (lista[i].is_refunded == 1) {
                item += "<br />";
                item += "<label class='label label-warning'>Pago reembolsado</label>";
            }
          
            item+="</div>"
            item += "</div>";
        }

        $("#" + id).html(item);

    }
    

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        


        cargar_datos_perfil();
        screen.orientation.lock("portrait");
        var item_auth = get_data_local();
       
                
        if(!item_auth){
            cerrar_session();
        }

       /* window.FirebasePlugin.onNotificationOpen(function(notification) {
            navigator.notification.alert(
                notification.body,  // message
                cerrar_push,        // callback
                notification.title, // title
                'Aceptar'           // buttonName
            );

           
         }, function(error) {
            // show_error(error);
         }); */

         
         pintar_lista_venta();

             
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
} )();