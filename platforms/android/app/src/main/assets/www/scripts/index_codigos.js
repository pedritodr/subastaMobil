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
   
    var long_press = 3000;
   

    
    

    
        

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
        
      /*  window.FirebasePlugin.onNotificationOpen(function(notification) {
            navigator.notification.alert(
                notification.body,  // message
                cerrar_push,        // callback
                notification.title, // title
                'Aceptar'           // buttonName
            );

           
         }, function(error) {
            // show_error(error);
         }); */
       
        
         setTimeout(function(){
            var url = base_url + 'rest_pago_amigo/get_codigos';
            var user_id = item_auth.id;
            var security_token = item_auth.security_token;

           
            $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));                    
                    },
                    data: {user_id:user_id,security_token:security_token},
                    success: function (response) {                    

                        $("#container_generated_code").hide();
                        $("#content-container").show();
                    
                        var status = response.status;
                        if (status == 200) {
                            
                            var lista_generados = response.codigos_generados;
                            var lista_recibidos = response.codigos_recibidos;                            
                            pintar_generados(lista_generados);
                            pintar_recibidos(lista_recibidos)

                        } else {
                            cerrar_session();                       
                        }



                    },
                    error: function (response) {                    
                         show_error(response);   
                    }
                });
         },1000);

        

        



              
       
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
} )();