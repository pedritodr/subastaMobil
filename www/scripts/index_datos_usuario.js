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

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }

        return false;
    } 

    function isAvailableSuccess(result) {
      
    }

    function isAvailableError(message) {
        $("#tab_header_huella").hide();
        $("#huella").hide();
    }

   

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        screen.orientation.lock("portrait");
        cargar_datos_perfil(); 
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

        var url = base_url + 'rest_user/load_user_data';
        var id = item_auth.id;
        var security_token = item_auth.security_token;


       // FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

         setTimeout(function(){
          
            $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: false,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));                    
                    },
                    data: {user_id:id,security_token:security_token},
                    success: function (response) {

                        var status = response.status;
                        if (status == 404) { // si existe error de autenticación
                            cerrar_session();
                        } else {
                            
                            var name = response.name;
                            var cedula = response.cedula;
                            var phone = response.phone;
                            $("#container_loading").hide();
                            $("#tab_container").fadeIn(400);
                            $("#name").val(name);
                            $("#cedula").val(cedula);
                            $("#phone").val(phone);
                            if(response.user_object.photo.length > 0){
                                $("#foto_perfil_usuario").attr('src',response.user_object.photo);
                                imageValidate = true;
                                imageURL = response.user_object.photo;
                            }

                        }
                    },
                    error: function (error) {
                          show_error(error);               
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