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
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
    
        cargar_datos_perfil();
        screen.orientation.lock("portrait");        
        var item_auth = get_data_local();
        
        if(!item_auth){
            cerrar_session();
        }else{
            if(item_auth.id == 0){
                cerrar_session();
            }
        }

        var fecha_hoy = null;
        var f = new Date();
        var dia = f.getDate();
        var mes = (f.getMonth()+1);
        var year = f.getFullYear().toString();
        
        if(dia.toString().length == 1){
            dia = '0'+dia.toString();
        }

        if(mes.toString().length == 1){
            mes = '0'+mes.toString();
        }

        fecha_hoy = year + "-" + mes + "-" + dia;
        
        

        setTimeout(function(){
            var url = base_url + 'rest_cadena/pedidos_en_ruta';
            $.ajax
            ({
                type: "POST",
                url: url,
                dataType: 'json',
                async: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));
                },
                data: { 
                    user_id: btoa(item_auth.id),
                    security_token:btoa(item_auth.security_token),
                    fecha_entrega:fecha_hoy
                },
                success: function (response) {                
                    $("#container_loading").hide();
                    var lista = response.lista;
                    pintar_pedidos(lista,fecha_hoy);
                },
                error: function (response) {
                   console.log(response);            
                }
            });
        },500);
        

       
        /*window.FirebasePlugin.onNotificationOpen(function(notification) {
            window.FirebasePlugin.setBadgeNumber(notification.badge);
            navigator.notification.alert(
                notification.body,  // message
                cerrar_push,        // callback
                notification.title, // title
                'Aceptar'           // buttonName
            );
           
         }, function(error) {
            // show_error(error);
         });*/
         
        
                       
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
} )();